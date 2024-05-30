'use client';

import { createContext, useState } from "react";

export const MapDataContext = createContext();

export function MapDataProvider({ children }) {
    const [location, setLocation] = useState([]);
    const [steps, setSteps] = useState([]);
    const [end, setEnd] = useState([0, 0]);
    const [mode, setMode] = useState('');
    const [kilometers, setKilometers] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [currentCity, setCurrentCity] = useState('');
    return (
        <MapDataContext.Provider value={{ location, setLocation, steps, setSteps, end, setEnd, mode, setMode, kilometers, setKilometers, estimatedTime, setEstimatedTime, currentCity, setCurrentCity }}>
            {children}
        </MapDataContext.Provider>
    );
}
