'use client';

import { useState, useMemo } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/firebase';
import PlaySvg from '@/app/assets/svg/play-svg';
import StreamHeader from './StreamHeader';

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
    const [selectedCategory, setSelectedCategory] = useState('');

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
        let result = data;

        if (searchTerm) {
            result = result.filter(item =>
                item.wordFil.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.wordEng.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.wordIlo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.wordPang.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            result = result.filter(item => item.category_letter === selectedCategory);
        }

        return result;
    }, [searchTerm, selectedCategory, data]);

    const groupedData = useMemo(() => {
        const grouped = filteredData.reduce((acc, item) => {
            const letter = item.category_letter.toUpperCase();
            if (!acc[letter]) acc[letter] = [];
            acc[letter].push(item);
            return acc;
        }, {});
        return Object.keys(grouped).sort().reduce((acc, key) => {
            acc[key] = grouped[key];
            return acc;
        }, {});
    }, [filteredData]);

    const uniqueCategories = useMemo(() => {
        const categories = data.map(item => item.category_letter.toUpperCase());
        return Array.from(new Set(categories)).sort();
    }, [data]);

    const getCategoryColor = (index) => {
        const colors = [
            'bg-indigo-500',
            'bg-indigo-400',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-start p-10 bg-gray-200 shadow-md rounded-lg space-y-2">
            <div className='flex flex-col justify-center items-start w-full gap-2 mb-4'>
                <h2 className="text-3xl font-bold text-gray-800">Read and Play the Dictionary Audio</h2>
                <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
                    <input
                        type="text"
                        className='w-full sm:w-[300px] rounded-lg p-2'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className='w-full sm:w-[150px] rounded-lg p-2'
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value=''>All Categories</option>
                        {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

            <StreamHeader />
            {Object.keys(groupedData).map((letter, index) => (
                <div key={letter} className={`w-full p-4 rounded-lg ${getCategoryColor(index)}`}>
                    <h3 className="text-2xl font-semibold text-white mb-4">{letter}</h3>
                    <div className='grid grid-cols-1 w-full gap-4'>
                        {groupedData[letter].map((item) => (
                            <div key={item.id} className="p-4 rounded-lg w-full bg-white">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                                    {['fil', 'eng', 'pang', 'ilo'].map((lang) => (
                                        <div key={lang} className="flex flex-row gap-2 items-center">
                                            <audio id={`audio-${item.id}-${lang}`} src={audioUrls[`${item.id}-${lang}`]} className="hidden">
                                                Your browser does not support the audio element.
                                            </audio>
                                            <button
                                                type='button'
                                                className="mt-2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-400 ease-in-out duration-200 m-2"
                                                onClick={() => handlePlayClick(item, lang)}
                                                disabled={loading === `${item.id}-${lang}`}
                                                aria-label={`Play ${item[`word${lang.charAt(0).toUpperCase() + lang.slice(1)}`]} in ${lang}`}
                                                role='button'
                                            >
                                                {loading === `${item.id}-${lang}` ? <LoadingIcon /> : (currentPlaying === `${item.id}-${lang}` ? <PlayingIcon /> : <PlayIcon />)}
                                            </button>
                                            <div className='flex flex-col'>
                                                <p className="font-semibold text-gray-950 text-[16px]">{item[`word${lang.charAt(0).toUpperCase() + lang.slice(1)}`]}</p>
                                                <p className="font-semibold text-gray-600 text-sm italic">{item[`pron${lang.charAt(0).toUpperCase() + lang.slice(1)}`]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StreamPage;
