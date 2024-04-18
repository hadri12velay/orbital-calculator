import React, { useEffect, useRef } from 'react';

import { changeOrbitStyle, get_kepler_elliptic } from '../scripts/orbit';

export default function Visual({ orbits }) {
    const visualRef = useRef(null);

    const displayOrbits = () => {
        const highest_a = orbits.reduce(
            (max, orbit) => Math.max(max, orbit.a),
            0
        );
        const el_width = visualRef.current.clientWidth;
        const el_height = visualRef.current.clientHeight;
        const max_dimension = Math.min(el_width, el_height);
        const fit_ratio = max_dimension / (highest_a * 2); // Used to make all orbits fit on the page

        orbits.forEach((orbit, key) => {
            const orbit_el = document.querySelector(
                `.orbit[orbit-id="${key}"]`
            );
            changeOrbitStyle({ orbit, element: orbit_el, fit_ratio });
        });
    };

    useEffect(() => {
        displayOrbits();
    }, [orbits]);
    return (
        <div id="Visual" ref={visualRef}>
            <div className="container">
                <div className="legend">
                    {orbits.map((orbit, key) => {
                        return (
                            <div
                                key={key}
                                className={`orbit-legend color${key}`}
                            >
                                {orbit.title}
                            </div>
                        );
                    })}
                </div>
                {orbits.map((orbit, key) => {
                    return (
                        <div
                            className={`orbit color${key}`}
                            orbit-id={key}
                            key={key}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
