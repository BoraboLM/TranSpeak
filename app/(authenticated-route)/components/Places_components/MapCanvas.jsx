'use client';
import { useCurrentLocation } from '@/app/hooks/useCurrentLocation';
import Map, { Marker } from 'react-map-gl';

const MapCanvas = () => {
    const coordinates = useCurrentLocation();
    return (
        <>
            {coordinates ? (
                <>
                    <Map
                        mapboxAccessToken='pk.eyJ1IjoibGF3cmVuY2VtYiIsImEiOiJjbHdrcXY1M2sxMTc4Mml1ZmVzM2J3cmliIn0.9Rd8wuc24B9IEOopD3qADA'
                        initialViewState={{
                            longitude: coordinates.longitude,
                            latitude: coordinates.latitude,
                            zoom: 16.5
                        }}
                        style={{ width: '75vw', height: '70vh' }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        <Marker longitude={coordinates.longitude} latitude={coordinates.latitude} anchor="bottom" >
                        </Marker>
                    </Map>
                </>
            ) : (
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-slate-950">
                    Your Location is not Available or Permission Denied
                </p>
            )}
        </>

    )
}

export default MapCanvas;