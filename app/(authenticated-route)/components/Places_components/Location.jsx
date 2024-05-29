'use client';

import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LocationCity() {
    const [cityData, setCityData] = useState([]);
    const [barangay, setBarangay] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [loading, setLoading] = useState(true);
    const coordinates = useCurrentLocation();
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN_KEY;

    useEffect(() => {
        if (coordinates) {
            axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}&access_token=${accessToken}`)
                .then(response => {
                    setCityData(response.data);
                    setBarangay(response.data.features[2].properties.name);
                    setCity(response.data.features[3].properties.full_address);
                    setStreet(response.data.features[0].properties.full_address);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching location data: ", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coordinates]);

    return (
        <div className="flex items-center flex-col">
            {loading ? (
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-white">
                    Please wait while we are fetching your Location...
                </p>
            ) : coordinates ? (
                <>
                    <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[700] tracking-wider text-slate-950">
                        You are now in <span className="text-bold text-white">{barangay}</span>
                    </h1>
                    <p>{street}</p>
                </>
            ) : (
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-slate-950">Your location is not available.</p>
            )}
        </div>
    );
}
