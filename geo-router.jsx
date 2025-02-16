import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const GEO_CACHE_KEY = "userGeoData";

const defaultGeoFetcher = async () => {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Error fetching geolocation data", error);
        return null;
    }
};

const defaultLoadingElement = <div>Loading...</div>

const GeoRender = ({ routes, getGeoData = defaultGeoFetcher, loadingElement = defaultLoadingElement }) => {
    const [userGeo, setUserGeo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cachedGeoData = localStorage.getItem(GEO_CACHE_KEY);
        if (cachedGeoData) {
            setUserGeo(JSON.parse(cachedGeoData));
            setLoading(false);
        } else {
            getGeoData().then((data) => {
                setUserGeo(data);
                setLoading(false);
            });
        }
    }, [getGeoData]);

    if (loading) return loadingElement;

    const checkGeoMatch = (routeGeo, userGeo) => {
        return Object.entries(routeGeo).every(([key, value]) => userGeo[key] === value);
    };

    return (
        <Routes>
            {routes.map(({ path, element, geoLocation, ...rest }, index) => {
                return (
                    <Route
                        key={index}
                        path={path}
                        {...rest}
                        element={
                            geoLocation && !checkGeoMatch(geoLocation, userGeo) ? (
                                <Navigate to={routes.find((r) => r.path === path && !r.geoLocation)?.path || "/"} />
                            ) : (
                                element
                            )
                        }
                    />
                );
            })}
        </Routes>
    );
};

export default GeoRender;