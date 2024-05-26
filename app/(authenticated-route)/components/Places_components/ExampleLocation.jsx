'use client';
import React, { useState } from 'react';

const GeolocationComponent = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setError(null);
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
            default:
                setError("An unknown error occurred.");
                break;
        }
    };

    return (
        <div>
            <button onClick={getLocation}>Get Location</button>
            {error ? (
                <p>{error}</p>
            ) : (
                location.lat && (
                    <p>
                        Latitude: {location.lat} <br />
                        Longitude: {location.lng}
                    </p>
                )
            )}
        </div>
    );
};

export default GeolocationComponent;
