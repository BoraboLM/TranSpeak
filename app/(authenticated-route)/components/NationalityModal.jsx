"use client";

import { useState, useEffect, useContext } from 'react';
import { toast } from "@/components/ui/use-toast";

export default function NationalityModal(nationality) {
    const [isOpen, setIsOpen] = useState(false);
    const [userNationality, setUserNationality] = useState
    setUserNationality(nationality);

    // FIX ME: MODAL SHOULD NOT OPEN IF LOCATION HAS VALUE
    useEffect(() => {
        if (userNationality === null) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [userNationality]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const saveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude: latitude, longitude: longitude });
                    localStorage.setItem('location', JSON.stringify({ latitude, longitude }));
                    toast({
                        title: `Success!`,
                        description: 'Location fetch successfully.',
                        variant: '',
                    })
                },
                (error) => {
                    console.error('Error getting location:', error);
                    toast({
                        title: `Failed Fetching your location`,
                        description: 'Oops! Something went wrong. Please try again.',
                        variant: 'destructive',
                    });
                }
            );
        } else {
            toast({
                title: `Failed to fetch location.`,
                description: 'Your browser does not support geolocation.',
                variant: 'destructive',
            });
        }
        closeModal();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 backdrop-blur-md z-10">
                    <div className="bg-white p-8 rounded-lg max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Use Location</h2>
                            <button className="text-gray-500" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="mb-4">Allow us to use your location to provide a better experience.</p>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={saveLocation}>Continue</button>
                            <button className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded border border-gray-300" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

