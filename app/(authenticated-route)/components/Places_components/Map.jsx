'use client';

import MapCanvas from "./MapCanvas";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function TranSpeakMap() {
    return (
        <div className="w-full flex justify-center rounded-lg">
            <MapCanvas />
        </div>
    )
}