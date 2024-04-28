"use client";

import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";

export default function LocationCity() {
    const coordinates = useCurrentLocation();

    return (
        <div className="flex items-center flex-col">
            <h1 className=" text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-white">You are now at this coordinates</h1>
            <p>Latitude: {coordinates?.latitude}</p>
            <p>Longitude: {coordinates?.longitude}</p>
        </div>
    )
}