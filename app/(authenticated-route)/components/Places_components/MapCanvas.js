'use client';
import { useEffect } from 'react';
import Map, {Marker} from 'react-map-gl';

const MapCanvas =() => {
    return(
        <Map
            mapboxAccessToken='pk.eyJ1IjoibGF3cmVuY2VtYiIsImEiOiJjbHdrcXY1M2sxMTc4Mml1ZmVzM2J3cmliIn0.9Rd8wuc24B9IEOopD3qADA'
            initialViewState={{
                longitude: 120.3397504282469,
                latitude: 16.076019207678236,
                zoom: 14
            }}
            style={{ width: '75vw', height: '70vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={120.3397504282469} latitude={16.076019207678236} anchor="bottom" >
            </Marker>
        </Map>
    )
}

export default MapCanvas;