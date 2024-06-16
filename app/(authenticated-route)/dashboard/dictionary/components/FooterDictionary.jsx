'use client';

import { useState, useEffect } from 'react';
import DictionaryModal from './DictionaryModal';

export default function FooterDictionary() {
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setModalOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [setModalOpen])

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const dummyData = {
        title: "Dummy Dictionary",
        description: "This is a dummy dictionary data used for testing purposes."
    };

    return (
        <div className="mt-4 flex flex-col w-full gap-4 px-6 py-4 bg-gray-50 shadow-lg shadow-slate-400 rounded-lg">
            <div className="flex items-center justify-start">
                <h1 className="text-[25px] font-[600] tracking-wide">
                    Uploaded Dictionary
                </h1>
            </div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleOpenModal}
            >
                Open Dictionary Modal
            </button>
            <DictionaryModal isOpen={isModalOpen} formData={dummyData}>
                {(data) => (
                    <div>
                        <h2 className="text-xl font-bold">{data.title}</h2>
                        <p>{data.description}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                )}
            </DictionaryModal>
        </div>
    );
}
