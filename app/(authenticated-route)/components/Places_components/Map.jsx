'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import MapCanvas from './MapCanvas';

export default function TranSpeakMap() {

    return (
        <div className="w-full flex justify-center rounded-lg">
            <MapCanvas />
        </div>
    )
}