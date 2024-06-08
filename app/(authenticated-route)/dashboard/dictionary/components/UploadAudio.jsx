'use client';

import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import FileInput from "./FileInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AudioUpload = () => {
    const [files, setFiles] = useState({ fil: null, pang: null, ilo: null, eng: null });
    const [words, setWords] = useState({ fil: "", pang: "", ilo: "", eng: "" });
    const [uploadProgress, setUploadProgress] = useState({ fil: 0, pang: 0, ilo: 0, eng: 0 });
    const [error, setError] = useState("");
    const [baseFilename, setBaseFilename] = useState("");
    const [shouldShowProgress, setShouldShowProgress] = useState(true);
    const session = useCurrentUser();

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles((prevFiles) => ({
            ...prevFiles,
            [name]: files[0]
        }));
    };

    const handleWordChange = (e) => {
        const { name, value } = e.target;
        setWords((prevWords) => ({
            ...prevWords,
            [name]: value
        }));
    };

    const validateInputs = () => {
        if (!baseFilename) {
            setError("Please enter a base filename.");
            return false;
        }

        for (const lang of Object.keys(files)) {
            if (!files[lang]) {
                setError(`Please select a file for ${lang.toUpperCase()}.`);
                return false;
            }
            if (!words[lang]) {
                setError(`Please enter a word for ${lang.toUpperCase()}.`);
                return false;
            }
        }

        return true;
    };

    const saveMetadata = async (metadata) => {
        try {
            const response = await fetch('/api/v1/dictionary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metadata),
            });

            if (!response.ok) {
                throw new Error('Failed to save audio metadata');
            }

            return response.json();

        } catch (error) {
            console.error('Error saving metadata:', error);
            setError('Error saving metadata.');
            return null;
        }
    };

    const handleUpload = async () => {
        // Reset progress and error states
        setShouldShowProgress(false);
        setUploadProgress({ fil: 0, pang: 0, ilo: 0, eng: 0 });
        setError("");

        // Validate inputs
        if (!validateInputs()) {
            return;
        }

        setShouldShowProgress(true);

        const metadata = {
            userId: session.id,
            baseFilename: baseFilename,
            baseFil: `${baseFilename.toLowerCase()}Fil`,
            baseEng: `${baseFilename.toLowerCase()}Eng`,
            baseIlo: `${baseFilename.toLowerCase()}Ilo`,
            basePang: `${baseFilename.toLowerCase()}Pang`,
            wordFil: words.fil.charAt(0).toUpperCase() + words.fil.slice(1),
            wordEng: words.eng.charAt(0).toUpperCase() + words.eng.slice(1),
            wordIlo: words.ilo.charAt(0).toUpperCase() + words.ilo.slice(1),
            wordPang: words.pang.charAt(0).toUpperCase() + words.pang.slice(1),
            category_letter: baseFilename.charAt(0).toUpperCase()
        };

        const saveMetadataResponse = await saveMetadata(metadata);
        if (!saveMetadataResponse || saveMetadataResponse.status !== 200) {
            setError(saveMetadataResponse?.message || 'Something went wrong. Please try again.');
            return;
        }

        const uploadTasks = Object.keys(files).map((lang) => {
            const file = files[lang];
            const filename = `${baseFilename}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
            const storageRef = ref(storage, `audios/${lang}/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, file, {
                customMetadata: { uploadedBy: session.name, language: lang, word: words[lang] }
            });

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress((prevProgress) => ({
                            ...prevProgress,
                            [lang]: progress
                        }));
                    },
                    (error) => {
                        setError(error.message);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve({ lang, downloadURL });
                    }
                );
            });
        });

        try {
            await Promise.all(uploadTasks);
            toast({
                variant: '',
                title: 'Upload complete!',
                description: 'All files have been uploaded successfully.'
            });

        } catch (error) {
            setError('Error uploading files.');
        }
    };

    const totalProgress = Object.values(uploadProgress).reduce((a, b) => a + b, 0);
    const averageProgress = Object.keys(uploadProgress).length ? totalProgress / Object.keys(uploadProgress).length : 0;

    useEffect(() => {
        if (averageProgress === 100) {
            setTimeout(() => {
                setShouldShowProgress(false);
            }, 5000);
        }
    }, [averageProgress]);

    useEffect(() => {
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Error uploading files',
                description: error
            })
        }

        if (averageProgress === 100) {
            toast({
                variant: '',
                title: 'Upload complete!',
                description: 'All files have been uploaded successfully.'
            })
        }
    }, [error, averageProgress])

    return (
        <div className="flex flex-col w-full gap-4 px-6 py-4 bg-white shadow-lg shadow-slate-400 rounded-lg">
            {shouldShowProgress && averageProgress > 0 && (
                <>
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-6">
                        <div
                            className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-white font-[600] tracking-widest"
                            style={{ width: `${averageProgress}%`, height: '30px' }}
                        >
                            {averageProgress === 100 ? 'Upload complete!' : `${averageProgress.toFixed(2)}%`}
                        </div>
                    </div>
                </>
            )}
            <h2 className="text-2xl font-bold text-gray-800">Upload Dictionary & Audio Files</h2>
            <div className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-1 w-full">
                    <label className="block text-xl font-medium text-gray-600">Base Filename</label>
                    <input
                        type="text"
                        className="mt-2 block w-[30%] py-2 px-4 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={baseFilename}
                        onChange={(e) => setBaseFilename(e.target.value)}
                        placeholder="Enter base filename"
                    />
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                        {['fil', 'pang', 'ilo', 'eng'].map((lang) => (
                            <div key={lang} className="w-[80%]">
                                <Label htmlFor={lang}>Word ({lang.charAt(0).toUpperCase() + lang.slice(1)})</Label>
                                <Input
                                    type="text"
                                    id={lang}
                                    name={lang}
                                    value={words[lang]}
                                    onChange={handleWordChange}
                                    placeholder={`Enter word in ${lang.charAt(0).toUpperCase() + lang.slice(1)}`}
                                />
                                <FileInput
                                    name={lang}
                                    handleFileChange={handleFileChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={handleUpload}
                        className="mt-2 w-[50%] bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Upload All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioUpload;
