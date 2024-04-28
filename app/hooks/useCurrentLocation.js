"use client";

import { useContext } from "react"
import { LocationContext } from "../(authenticated-route)/components/context/LocationProvide"

export const useCurrentLocation = () => {
    const { location } = useContext(LocationContext);

    return location;
}