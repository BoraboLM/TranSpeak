'use client';

import { useContext, useEffect, useState } from "react";
import { MapDataContext } from "../context/MapProvider";
import MapHeaderLoader from "./Loader/MapHeaderLoader";

export default function MapHeader() {
    const { steps } = useContext(MapDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (steps.length > 0) {
            setLoading(false);
        }
    }, [steps]);

    return (
        <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-10 py-2">
            <div className="flex flex-1 flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <h3 className="text-lg font-semibold text-center sm:text-left">Position</h3>
                <h3 className="text-lg font-semibold text-center sm:text-left">Target Location</h3>
            </div>
            <div className="flex flex-1 justify-center sm:justify-end items-center">
                {loading ? (
                    <MapHeaderLoader />
                ) : (
                    steps.length > 0 ? (
                        <p className="text-lg text-gray-800">Steps</p>
                        // <ul>
                        //     {steps.map((step, index) => (
                        //         <li key={index}>{step.maneuver.instruction}</li>
                        //     ))}
                        // </ul>
                    ) : (
                        <p className="text-center sm:text-right">No steps available</p>
                    )
                )}
            </div>
        </div>

    );
}
