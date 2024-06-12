/**
 * For fetching the coordinates of the locations, use the following link:
 * {@link https://docs.mapbox.com/playground/directions/}
 */
'use client';

import { useContext, useEffect, useState } from "react";
import { MapDataContext } from "../context/MapProvider";
import MapHeaderLoader from "./Loader/MapHeaderLoader";
import PinNotAvailable from "@/app/assets/image/not-available-pin.png";
import Image from "next/image";
import axios from "axios";

export default function MapHeader() {
    const { location, setEnd, setMode, mode, steps, kilometers, estimatedTime, currentCity } = useContext(MapDataContext);
    const [loading, setLoading] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (location.length > 0 && currentCity !== '') {
                const res = await axios.get(`api/v1/places`, { params: { city: currentCity } });
                setOptions(res.data.data);
                setLoading(false);
            }
        };
        fetchData();
    }, [location, currentCity]);


    // Mounting the component if location is not available
    if (location.length === 0) {
        return (
            <div className="flex items-center justify-center mb-4">
                <Image src={PinNotAvailable} alt="Location not available" width={150} height={150} priority />
            </div>
        );
    }

    const handleLocationChange = (e) => {
        const selectedId = e.target.value;
        const selectedLocationData = options.find(location => location.id === selectedId);
        if (selectedLocationData) {
            setSelectedLocation(selectedLocationData.id);
            setEnd([selectedLocationData.longitude, selectedLocationData.latitude]);
        }
    };

    const handleModeChange = (e) => {
        const selectedMode = e.target.value;
        setMode(selectedMode);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-10 py-2 bg-slate-200 shadow-md rounded-lg">
                <div className="flex flex-1 flex-col items-center sm:flex-row gap-4 justify-center sm:justify-start">
                    <h3 className="text-lg font-semibold text-center sm:text-left">Target Location:</h3>
                    <select
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        className="mt-2 sm:mt-0 border rounded-md p-2"
                    >
                        <option disabled value=''>Select a location</option>
                        {options.map(location => (
                            <option key={location.id} value={location.id}>{location.location}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-1 flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
                    <h3 className="text-lg font-semibold text-center sm:text-left">Mode:</h3>
                    <select
                        value={mode}
                        onChange={handleModeChange}
                        className="mt-2 sm:mt-0 border rounded-md p-2"
                    >
                        <option disabled value=''>Select a mode</option>
                        <option value="driving">Driving</option>
                        <option value="walking">Walking</option>
                        <option value="cycling">Cycling</option>
                    </select>
                </div>
                <div className="flex flex-1 justify-center sm:justify-end items-center">
                    {loading ? (
                        <MapHeaderLoader />
                    ) : (
                        <button
                            onClick={toggleSidebar}
                            className="text-lg text-gray-800 border rounded-md p-2 hover:bg-gray-100 transition"
                        >
                            Show Steps
                        </button>
                    )}
                </div>
            </div>

            {isSidebarVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity ">
                    <div className="bg-white w-full max-w-lg h-auto max-h-[80%] p-6 rounded-lg shadow-lg overflow-y-auto relative">
                        <button
                            onClick={() => setIsSidebarVisible(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl transition"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-6">Route Steps</h2>
                        {steps.length > 0 ? (
                            <>
                                <div className="w-full flex flex-col justify-start items-start mb-5">
                                    <p className="text-lg font-semibold text-gray-700">Distance: {kilometers} km</p>
                                    <p className="text-lg font-semibold text-gray-700">Estimated Time: {estimatedTime}</p>
                                </div>
                                <ul className="list-decimal pl-6 space-y-2">
                                    {steps.map((step, index) => (
                                        <li key={index} className="mb-2 text-gray-700">
                                            <span className="font-bold"></span> {step.maneuver.instruction}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="text-gray-700">No steps available</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
