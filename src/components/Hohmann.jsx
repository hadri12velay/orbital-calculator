import React, { useEffect, useState, useRef } from 'react';

import { Orbit, Transfer } from '../scripts/orbit';

export default function Hohmann({ setOrbits }) {
    const earthMu = 398600;
    const defaultMu = earthMu;
    const defaultR1 = 15000;
    const defaultR2 = 42164;
    const [mu, setMu] = useState(defaultMu);
    const [R1, setR1] = useState(defaultR1);
    const [R2, setR2] = useState(defaultR2);
    const [output, setOutput] = useState({});
    const [isEarth, setIsEarth] = useState(true);

    const handleCalculate = () => {
        console.log('Circular Hohmann Transfer');
        const orbit1 = new Orbit({ mu: mu, r_a: R1, e: 0 });
        const orbit2 = new Orbit({ mu: mu, r_a: R2, e: 0 });
        const orbit_transfer = new Transfer(orbit1, orbit2);
        orbit_transfer.circularHohmann();

        setOutput(orbit_transfer);

        const center = {
            mass: true,
            type: isEarth ? 'earth' : 'planet',
            a: 6371,
            b: 6371,
            c: 0,
            OMEGA: 0,
        };
        const orbits_obj = [
            {
                ...orbit1,
                title: 'Starting orbit',
            },
            {
                ...orbit_transfer,
                title: 'Transfer orbit',
                type: 'transfer',
            },
            {
                ...orbit2,
                title: 'Final orbit',
            },
            center,
        ];
        setOrbits(orbits_obj);
    };

    const round = (number, decimal) => {
        return Math.round(number * 10 ** decimal) / 10 ** decimal;
    };

    useEffect(() => {
        handleCalculate();
    }, []);

    return (
        <div id="Hohmann" className="calculate-box">
            <h3>Circular Hohmann Transfer</h3>
            <div className="input">
                <label>Earth</label>
                <input
                    type="checkbox"
                    name="isEarth"
                    defaultChecked={isEarth}
                    onChange={(e) => {
                        setIsEarth(e.target.checked);
                        setMu(isEarth ? earthMu : defaultMu);
                    }}
                />
                {!isEarth && (
                    <>
                        <label>
                            &mu; (km<sup>3</sup>s<sup>-2</sup>):
                        </label>
                        <input
                            type="text"
                            defaultValue={defaultMu}
                            placeholder={defaultMu}
                            onChange={(e) => setMu(Number(e.target.value))}
                        />
                    </>
                )}
                <label>Radius 1 (km):</label>
                <input
                    type="text"
                    defaultValue={defaultR1}
                    placeholder={defaultR1}
                    onChange={(e) => setR1(Number(e.target.value))}
                />

                <label>Radius 2 (km):</label>
                <input
                    type="text"
                    defaultValue={defaultR2}
                    placeholder={defaultR2}
                    onChange={(e) => setR2(Number(e.target.value))}
                />

                <button className="calculate" onClick={handleCalculate}>
                    Calculate
                </button>
            </div>
            <div className="output">
                <p>&Delta;V1-&gt; {round(output.DELTA_V_1, 4)} km/s</p>
                <p>&Delta;V2-&gt; {round(output.DELTA_V_2, 4)} km/s</p>
                <p>&Delta;V Total-&gt; {round(output.DELTA_V_total, 4)} km/s</p>
            </div>
        </div>
    );
}
