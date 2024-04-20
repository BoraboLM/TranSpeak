"use client";

import { createContext, useState } from "react";

export const LocationContext = createContext({})

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null)
    return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>
}