'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import MapCanvas from './MapCanvas';
import { MapDataProvider } from '../context/MapProvider';
import MapHeader from './MapHeader';

export default function TranSpeakMap() {

    return (
        <div className="w-full flex flex-col justify-center rounded-lg">
            <MapDataProvider>
                <MapHeader />
                <MapCanvas />
            </MapDataProvider>
        </div>
    )
}