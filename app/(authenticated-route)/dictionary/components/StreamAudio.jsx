'use client';

import { useState } from 'react';
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

const StreamPage = () => {
    const [audioUrls, setAudioUrls] = useState({});
    const [error, setError] = useState('');
    const [currentPlaying, setCurrentPlaying] = useState('');

    const handlePlayClick = async (lang) => {
        if (!audioUrls[lang]) {
            const fileNames = {
                fil: 'pasokFil',
                eng: 'pasokEng',
                pang: 'pasokPang',
                ilo: 'pasokIlo'
            };

            try {
                const filePath = `audios/${lang}/${fileNames[lang]}`;
                const fileRef = ref(storage, filePath);
                const url = await getDownloadURL(fileRef);
                setAudioUrls(prevUrls => ({ ...prevUrls, [lang]: url }));
            } catch (error) {
                console.error('Error fetching audio URL:', error);
                setError('Error fetching audio URL.');
                return;
            }
        }

        const audio = document.getElementById(`audio-${lang}`);

        if (currentPlaying === lang) {
            audio.pause();
            setCurrentPlaying('');
        } else {
            if (currentPlaying) {
                const currentAudio = document.getElementById(`audio-${currentPlaying}`);
                currentAudio.pause();
            }
            audio.currentTime = 0;
            audio.play();
            setCurrentPlaying(lang);
        }

        audio.onended = () => {
            setCurrentPlaying('');
        };
    };

    return (
        <div className="w-full flex flex-col justify-center items-center p-10 bg-gray-200 shadow-md rounded-lg space-y-6 mt-10">
            <div>
                <input type="text" className='w-[300px] rounded-lg p-2 flex justify-center items-start' placeholder='Search' />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Read and Play the Dictionary Audio</h2>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {['fil', 'eng', 'pang', 'ilo'].map((lang) => (
                <div key={lang} className="mt-6 p-4 border border-gray-200 rounded-lg w-full flex flex-row gap-4 items-center">
                    <p className="font-semibold text-gray-800 text-lg">{lang.toUpperCase()} Audio:</p>
                    <audio id={`audio-${lang}`} src={audioUrls[lang]} className="hidden">
                        Your browser does not support the audio element.
                    </audio>
                    <button
                        className="mt-2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => handlePlayClick(lang)}
                    >
                        {currentPlaying === lang ? <PlayingIcon /> : <PlayIcon />}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default StreamPage;
