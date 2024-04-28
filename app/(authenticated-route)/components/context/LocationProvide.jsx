"use client";

import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext({})

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null)
    useEffect(() => {
        const savedLocation = localStorage.getItem('location');
        if (savedLocation) {
            setLocation(JSON.parse(savedLocation));
        }
    }, []);

    return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>
}