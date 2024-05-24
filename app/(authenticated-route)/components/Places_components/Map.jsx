'use client';

import { useCallback, useEffect, useState } from "react";
// import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 16.076019207678236,
    lng: 120.3397504282469
};

export default function TranSpeakMap() {
    // const position = { lat: 16.076019207678236, lng: 120.3397504282469 };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    return (
        <div className="w-full h-full flex justify-center items-center">
            {/* <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
                <Map center={position} zoom={9} >
                </Map>
            </APIProvider> */}
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            ) : (
                <>
                    <span>Loading...</span>
                </>
            )}

        </div>
    )
}