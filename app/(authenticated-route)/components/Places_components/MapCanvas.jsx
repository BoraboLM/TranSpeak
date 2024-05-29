'use client';
import axios from 'axios';
import { useCurrentLocation } from '@/app/hooks/useCurrentLocation';
import { useEffect, useState, useRef, useContext } from 'react';
import ReactMapGl, { Marker, NavigationControl, GeolocateControl, FullscreenControl, AttributionControl, ScaleControl, Source, Layer } from 'react-map-gl';
import { Suspense } from 'react';
import { MapDataContext } from '../context/MapProvider';
import MapLoader from './Loader/MapLoader';

const MapCanvas = () => {
    const { location, setLocation, setSteps, end, mode, setKilometers, setEstimatedTime } = useContext(MapDataContext);
    const coordinates = useCurrentLocation();
    const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN_KEY;
    const [viewState, setViewState] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 16.5
    });
    const [start, setStart] = useState([0, 0]);
    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(true);

    const GeolocateControlRef = useRef();

    useEffect(() => {
        if (coordinates) {
            setViewState({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                zoom: 15
            });
            setStart([coordinates.longitude, coordinates.latitude]);
            setLocation([coordinates.longitude, coordinates.latitude]);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [coordinates, setLocation]);

    useEffect(() => {
        if (start[0] !== 0 && start[1] !== 0 && end[0] !== 0 && end[1] !== 0 && mode !== '') {
            const fetchRoute = async () => {
                try {
                    const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${mode}/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapBoxToken}`);
                    const data = response.data;
                    const steps = data.routes[0].legs[0].steps;
                    setCoords(data.routes[0].geometry.coordinates);
                    setSteps(steps);
                    setKilometers((data.routes[0].distance / 1000).toFixed(1));
                    const durationInMinutes = data.routes[0].duration / 60;
                    const hours = Math.floor(durationInMinutes / 60);
                    const minutes = Math.round(durationInMinutes % 60);
                    setEstimatedTime(hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`);
                } catch (error) {
                    console.error("Failed to fetch route", error);
                }
            };

            fetchRoute();
        }
    }, [start, end, mapBoxToken, setSteps, mode, setKilometers, setEstimatedTime]);

    const geojson = {
        'type': 'FeatureCollection',
        'features': [{
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [...coords]
            },
        }]
    };

    const lineStyle = {
        id: 'roadLayer',
        type: 'line',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#4a80f5',
            'line-width': 8,
            'line-opacity': 0.75
        }
    };

    const endPoint = {
        'type': 'FeatureCollection',
        'features': [{
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [...end]
            }
        }]
    };

    const endPointStyle = {
        id: 'endPointRoute',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': 'red'
        }
    };

    return (
        <>
            {loading ? (
                <MapLoader />
            ) : coordinates ? (
                <div className='flex flex-col items-center'>
                    <ReactMapGl
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        mapboxAccessToken={mapBoxToken}
                        style={{ width: '80vw', height: '70vh' }}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        attributionControl={false}
                    >
                        <Suspense fallback={<p>Loading feed...</p>}>
                            <Source id='routeSource' type='geojson' data={geojson}>
                                <Layer {...lineStyle} />
                            </Source>
                            <Source id='endPointRoute' type='geojson' data={endPoint}>
                                <Layer {...endPointStyle} />
                            </Source>
                        </Suspense>
                        <Marker
                            longitude={coordinates.longitude}
                            latitude={coordinates.latitude}
                            anchor="center"
                        />
                        <FullscreenControl />
                        <NavigationControl />
                        <GeolocateControl
                            showAccuracyCircle={false}
                            onGeolocate={(e) => setStart([e.coords.longitude, e.coords.latitude])}
                            ref={GeolocateControlRef}
                        />
                        <ScaleControl maxWidth={200} />
                        <AttributionControl customAttribution="This map is from Mapbox and will be used for Capstone Project only" />
                    </ReactMapGl>
                </div>
            ) : (
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:2xl xl:text-4xl 2xl:text-4xl font-[600] tracking-wide text-slate-950">
                    Your Location is not Available or Permission Denied
                </p>
            )}
        </>
    );
};

export default MapCanvas;
