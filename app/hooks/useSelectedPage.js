"use client";

import { createContext, useState } from "react";

export const SelectedPageContext = createContext({})

export function SelectedPageProvider({ children }) {
    const [selectedPage, setSelectedPage] = useState('Dashboard')

    return <SelectedPageContext.Provider value={{ selectedPage, setSelectedPage }}>{children}</SelectedPageContext.Provider>
}