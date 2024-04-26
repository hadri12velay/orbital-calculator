import React, { useEffect, useRef } from 'react';

const changeOrbitStyle = ({ orbit, element, zoom }) => {
    const width = orbit.a * 2 * zoom;
    const height = orbit.b * 2 * zoom;
    const rotation = (orbit.omega + orbit.OMEGA) * -1;
    const translateY = orbit.c * Math.sin(rotation) * zoom * -1;
    let translateX = orbit.c * Math.cos(rotation) * zoom * -1;
    if (orbit.flipped) translateX = -translateX;

    element.style['width'] = `${width}px`;
    element.style['height'] = `${height}px`;
    element.style[
        'transform'
    ] = `translate(-50%, -50%) translateY(${translateY}px) translateX(${translateX}px) rotate(${rotation}rad)`;
};

export default function Visual({ orbits }) {
    const visualRef = useRef(null);

    const displayOrbits = () => {
        const highest_a = orbits.reduce(
            (max, orbit) => Math.max(max, orbit.a + orbit.c),
            0
        );
        const el_width = visualRef.current.clientWidth;
        const el_height = visualRef.current.clientHeight;
        const max_dimension = Math.min(el_width, el_height);
        const zoom = max_dimension / (highest_a * 2); // Used to make all orbits fit on the page

        orbits.forEach((orbit, key) => {
            const orbit_el = document.querySelector(
                `.orbit[orbit-id="${key}"]`
            );
            changeOrbitStyle({
                orbit,
                element: orbit_el,
                zoom,
            });
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
                            className={`orbit color${key} ${orbit.type} ${
                                orbit.mass ? 'mass' : ''
                            }`}
                            orbit-id={key}
                            key={key}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
