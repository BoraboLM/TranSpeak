'use client';
import { useCurrentLocation } from '@/app/hooks/useCurrentLocation';
import Map, { Marker, NavigationControl, GeolocateControl, FullscreenControl, AttributionControl, ScaleControl } from 'react-map-gl';

const MapCanvas = () => {
    const coordinates = useCurrentLocation();
    const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN_KEY;
    // const mapBoxToken = 'pk.eyJ1IjoibGF3cmVuY2VtYiIsImEiOiJjbHdrcXY1M2sxMTc4Mml1ZmVzM2J3cmliIn0.9Rd8wuc24B9IEOopD3qADA'
    return (
        <>
            {coordinates ? (
                <>
                    <Map
                        mapboxAccessToken={mapBoxToken}
                        initialViewState={{
                            longitude: coordinates.longitude,
                            latitude: coordinates.latitude,
                            zoom: 16.5
                        }}
                        style={{ width: '80vw', height: '70vh' }}
                        mapStyle="mapbox://styles/mapbox/standard"
                        attributionControl={false}
                        lazy={true}
                    >
                        <Marker
                            longitude={coordinates.longitude}
                            latitude={coordinates.latitude}
                            anchor="center"
                        />
                        <FullscreenControl />
                        {/* If you want to remove the controls like: (showCompass, showZoom, and visualizePitch) use these props and set it to false.*/}
                        <NavigationControl />
                        <GeolocateControl />
                        <ScaleControl maxWidth={200} />
                        <AttributionControl customAttribution="This map is from Mapbox and will be used for Capstone Project only!" />
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