'use client';

import { useState, useMemo, useCallback } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/firebase';
import PlaySvg from '@/app/assets/svg/play-svg';

const PlayIcon = () => (
    <PlaySvg />
);

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

const StreamPage = ({ data }) => {
    const [audioUrls, setAudioUrls] = useState({});
    const [error, setError] = useState('');
    const [currentPlaying, setCurrentPlaying] = useState('');
    const [loading, setLoading] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
        }

        audio.onended = () => {
            setCurrentPlaying('');
        };
    };

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(item =>
            item.wordFil.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.wordEng.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.wordIlo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.wordPang.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, data]);

    return (
        <div className="w-full flex flex-col justify-center items-center p-10 bg-gray-200 shadow-md rounded-lg space-y-6 mt-10">
            <div>
                <input
                    type="text"
                    className='w-[300px] rounded-lg p-2 flex justify-center items-start'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Read and Play the Dictionary Audio</h2>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {filteredData.map((item) => (
                <div key={item.id} className="mt-6 p-4 border border-gray-200 rounded-lg w-full flex flex-col gap-4">
                    {['fil', 'eng', 'pang', 'ilo'].map((lang) => (
                        <div key={lang} className="flex flex-row gap-4 items-center">
                            <p className="font-semibold text-gray-800 text-lg">{item[`word${lang.charAt(0).toUpperCase() + lang.slice(1)}`]} ({lang.toUpperCase()}):</p>
                            <audio id={`audio-${item.id}-${lang}`} src={audioUrls[`${item.id}-${lang}`]} className="hidden">
                                Your browser does not support the audio element.
                            </audio>
                            <button
                                className="mt-2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-400 ease-in-out duration-200"
                                onClick={() => handlePlayClick(item, lang)}
                                disabled={loading === `${item.id}-${lang}`}
                            >
                                {loading === `${item.id}-${lang}` ? <LoadingIcon /> : (currentPlaying === `${item.id}-${lang}` ? <PlayingIcon /> : <PlayIcon />)}
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default StreamPage;
