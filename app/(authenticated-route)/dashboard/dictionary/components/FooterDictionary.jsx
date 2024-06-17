'use client';

import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/firebase';
import PlaySvg from '@/app/assets/svg/play-svg';
import DictionaryModal from './DictionaryModal';
import { saveAnalytics } from '@/app/action/dictionary/save-analytics';
import { useCurrentUser } from '@/app/hooks/use-current-user';
import StatusSwitch from './Status';
import { Switch } from '@/components/ui/switch';
import { UpdateDictionaryStatus } from '@/app/action/dictionary/update-status';
import NoDataFound from '@/app/assets/svg/no-data';

const PlayIcon = () => <PlaySvg />;
const PlayingIcon = () => (
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="18" height="18" fill="currentColor" />
    </svg>
);
const LoadingIcon = () => (
    <svg className="animate-spin" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="50.265" strokeDashoffset="25" />
    </svg>
);

export default function FooterDictionary({ data }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [audioUrls, setAudioUrls] = useState({});
    const [error, setError] = useState('');
    const [currentPlaying, setCurrentPlaying] = useState('');
    const [loading, setLoading] = useState('');
    const userId = useCurrentUser()?.id;
    const [dataStatus, setDataStatus] = useState(data.status);
    const [dictionaryData, setDictionaryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        const sortedData = [...data].sort((a, b) => a.baseFilename.localeCompare(b.baseFilename));
        setDictionaryData(sortedData);

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [data]);

    const handleOpenModal = (item) => {
        setSelectedData(item);
        setDataStatus(item.status);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedData(null);
    };

    const logPlayEvent = async (item, lang) => {
        try {
            const data = {
                word: item[`word${lang.charAt(0).toUpperCase() + lang.slice(1)}`],
                lang: lang,
                wordId: item.id,
                userId: userId,
            };

            await saveAnalytics(data);
        } catch (error) {
            console.error('Failed to log play event:', error);
        }
    };

    const handlePlayClick = async (item, lang) => {
        const itemLangKey = `${item.id}-${lang}`;

        if (!audioUrls[itemLangKey]) {
            const fileNames = {
                fil: item.baseFil,
                eng: item.baseEng,
                pang: item.basePang,
                ilo: item.baseIlo
            };

            try {
                setLoading(itemLangKey);
                const filePath = `audios/${lang}/${fileNames[lang]}`;
                const fileRef = ref(storage, filePath);
                const url = await getDownloadURL(fileRef);
                setAudioUrls(prevUrls => ({
                    ...prevUrls,
                    [itemLangKey]: url
                }));
                setLoading('');
            } catch (error) {
                console.error('Error fetching audio URL:', error);
                setError('Error fetching audio URL.');
                setLoading('');
                return;
            }
        }

        const audio = document.getElementById(`audio-${itemLangKey}`);

        if (currentPlaying === itemLangKey) {
            audio.pause();
            setCurrentPlaying('');
        } else {
            if (currentPlaying) {
                const currentAudio = document.getElementById(`audio-${currentPlaying}`);
                if (currentAudio) currentAudio.pause();
            }
            audio.currentTime = 0;
            audio.play();
            setCurrentPlaying(itemLangKey);
            logPlayEvent(item, lang);
        }

        audio.onended = () => {
            setCurrentPlaying('');
        };
    };

    const handleToggle = () => {
        const newStatus = dataStatus === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        setDataStatus(newStatus);
        setSelectedData(prevData => ({
            ...prevData,
            status: newStatus
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSelectedData(prevData => ({
            ...prevData,
            status: dataStatus
        }));
        const newData = {
            id: selectedData.id,
            status: dataStatus
        };

        await UpdateDictionaryStatus({ newData });
        handleCloseModal();

        const updatedData = dictionaryData.map(item =>
            item.id === selectedData.id ? { ...item, status: dataStatus } : item
        );
        const sortedUpdatedData = [...updatedData].sort((a, b) => a.baseFilename.localeCompare(b.baseFilename));
        setDictionaryData(sortedUpdatedData);
    };

    const filteredData = dictionaryData.filter(item => {
        const matchesSearchTerm = item.baseFilename.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatusFilter = statusFilter === 'ALL' || item.status === statusFilter;
        return matchesSearchTerm && matchesStatusFilter;
    });

    return (
        <div className="mt-4 flex flex-col w-full gap-4 px-6 py-4 bg-gradient-to-r from-sky-100 to-pink-100 shadow-lg shadow-slate-400 rounded-lg">
            <div className="flex items-center justify-start">
                <h1 className="text-[25px] font-[600] tracking-wide">
                    Uploaded Dictionary
                </h1>
            </div>
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    className="border p-2 rounded-lg w-1/3"
                    placeholder="Search dictionary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-[20%]"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="DISABLED">Disabled</option>
                </select>
            </div>

            <div className={`gap-4 ${filteredData.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'flex justify-center items-center'}`}>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div
                            key={item.id}
                            className={`p-8 shadow rounded-lg cursor-pointer transition-all ease-in-out duration-200 transform hover:scale-105 ${item.status === 'DISABLED' ? 'bg-red-300 transition ease-in-out duration-200 hover:bg-red-500 hover:text-white' : 'bg-white hover:bg-gradient-to-t hover:from-pink-50 hover:to-indigo-100'
                                }`}
                            onClick={() => handleOpenModal(item)}
                        >
                            <h2 className="text-lg font-bold">{item.baseFilename.replace(/\b\w/g, (char) => char.toUpperCase())}</h2>
                            <p>Status: {item.status}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center w-full text-center gap-2 min-h-[40vh]">
                        <h1 className="text-2xl font-bold">No data found</h1>
                        <NoDataFound />
                    </div>
                )}
            </div>

            {isModalOpen && selectedData && (
                <DictionaryModal isOpen={isModalOpen} formData={selectedData}>
                    {(data) => (
                        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                            <div className='flex flex-row gap-4 justify-between px-14 py-4 w-full'>
                                <h2 className="text-lg font-bold">{data.baseFilename.replace(/\b\w/g, (char) => char.toUpperCase())}</h2>
                                <Switch
                                    checked={dataStatus === 'ACTIVE'}
                                    onCheckedChange={handleToggle}
                                />
                            </div>
                            <div className='border-b-4 border-gray-500 w-[90%] m-auto'></div>
                            <div className="flex flex-row gap-11 justify-center space-x-4 px-6 py-10 w-full">
                                {['fil', 'eng', 'pang', 'ilo'].map((lang) => (
                                    <div key={lang} className="flex flex-col items-center justify-center">
                                        <audio id={`audio-${data.id}-${lang}`} src={audioUrls[`${data.id}-${lang}`]} className="hidden">
                                            Your browser does not support the audio element.
                                        </audio>
                                        <button
                                            type='button'
                                            className="mt-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white w-12 h-12 rounded-full flex items-center justify-center hover:from-blue-400 hover:to-blue-300 transition duration-200 m-2 shadow-lg"
                                            onClick={() => handlePlayClick(data, lang)}
                                            disabled={loading === `${data.id}-${lang}`}
                                            aria-label={`Play ${data[`word${lang.charAt(0).toUpperCase() + lang.slice(1)}`]} in ${lang}`}
                                            role='button'
                                        >
                                            {loading === `${data.id}-${lang}` ? <LoadingIcon /> : (currentPlaying === `${data.id}-${lang}` ? <PlayingIcon /> : <PlayIcon />)}
                                        </button>
                                        <div className='flex flex-col'>
                                            <p className="font-semibold text-gray-900 text-lg">{data[`word${lang.charAt(0).toUpperCase() + lang.slice(1)}`]}</p>
                                            <p className="font-medium text-gray-600 text-sm italic">{data[`pron${lang.charAt(0).toUpperCase() + lang.slice(1)}`]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                Save Changes
                            </button>
                        </form>
                    )}
                </DictionaryModal>
            )}
        </div>
    );
}
