'use client';

import { createContext, useState } from "react";

export const MapDataContext = createContext();

export function MapDataProvider({ children }) {
    const [location, setLocation] = useState([]);
    const [steps, setSteps] = useState([]);
    return (
        <MapDataContext.Provider value={{ location, setLocation, steps, setSteps }}>
            {children}
        </MapDataContext.Provider>
    );
}
