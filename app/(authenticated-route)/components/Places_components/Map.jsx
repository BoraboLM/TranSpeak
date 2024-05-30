'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import MapCanvas from './MapCanvas';
import { MapDataProvider } from '../context/MapProvider';
import MapHeader from './MapHeader';
import LocationCity from './Location';

export default function TranSpeakMap() {

    return (
        <div className="w-full flex flex-col justify-center items-center rounded-lg gap-4">
            <MapDataProvider>
                <div className="flex items-center justify-center w-full sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[80%] 2xl:w-[80%] bg-2 bg-emerald-400 py-4  rounded-2xl mt-4">
                    <LocationCity />
                </div>
                <MapHeader />
                <MapCanvas />
            </MapDataProvider>
        </div>
    )
}