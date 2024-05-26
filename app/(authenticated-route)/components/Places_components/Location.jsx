"use client";

import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function LocationCity() {
    const [cityData, setCityData] = useState([]);
    const [barangay, setBarangay] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const coordinates = useCurrentLocation();
    const accessToken = 'pk.eyJ1IjoibGF3cmVuY2VtYiIsImEiOiJjbHdrcXY1M2sxMTc4Mml1ZmVzM2J3cmliIn0.9Rd8wuc24B9IEOopD3qADA';

    useEffect(() => {
        if (coordinates) {
            axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}&access_token=${accessToken}`)
                .then(response => {
                    setCityData(response);
                    setBarangay(response.data.features[2].properties.name);
                    setCity(response.data.features[3].properties.full_address);
                    setStreet(response.data.features[0].properties.full_address)
                })
                .catch(error => {
                    console.error("Error fetching location data: ", error);
                });
        }
    }, [coordinates]);

    return (
        <div className="flex items-center flex-col">
            {coordinates ? (
                <>
                    <h1 className=" text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[700] tracking-wider text-slate-950">You are now in <span className="text-bold text-white">{barangay}</span></h1>
                    <p>{street}</p>
                </>
            ) : (
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-slate-950">Your location is not available.</p>
            )}
        </div>
    )
}