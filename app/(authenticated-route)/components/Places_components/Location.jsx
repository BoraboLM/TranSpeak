"use client";

import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import { useSession } from "next-auth/react"

export default function LocationCity() {
    const coordinates = useCurrentLocation();
    return (
        <div className="flex items-center flex-col">
            {coordinates ? (
                <>
                    <h1 className=" text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-slate-950">You are now in <span className="text-bold text-red-600">Dagupan</span></h1>
                    <p>Latitude: {coordinates.latitude}</p>
                    <p>Longitude: {coordinates.longitude}</p>
                </>
            ) : (
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-slate-950">Your location is not available.</p>
            )}
        </div>
    )
}