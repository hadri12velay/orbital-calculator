import React, { useEffect, useState, useRef } from 'react';

import { Orbit, Transfer } from '../scripts/orbit';

export default function OrbitCreator({ setOrbits }) {
    const earthMu = 398600;
    const defaultMu = earthMu;
    const defaultR_p = 10000;
    // const defaultR_a = 100000;
    const defaultE = 0.7;
    const defaultOmega = 0;
    const [isEarth, setIsEarth] = useState(true);
    const [mu, setMu] = useState(defaultMu);
    // const [r_a, setR_a] = useState(defaultR_a);
    const [r_p, setR_p] = useState(defaultR_p);
    const [e, setE] = useState(defaultE);
    const [omega, setOmega] = useState(defaultOmega);

    const handleCalculate = () => {
        console.log('Orbit Creator');
        const orbit = new Orbit({ mu, r_p, e, omega });

        const center = {
            mass: true,
            type: isEarth ? 'earth' : 'planet',
            a: 6371,
            b: 6371,
            c: 0,
            OMEGA: 0,
            omega: 0,
        };
        const orbits_obj = [
            {
                ...orbit,
                title: 'Orbit 1',
            },
            center,
        ];
        setOrbits(orbits_obj);
    };

    const round = (number, decimal) => {
        return Math.round(number * 10 ** decimal) / 10 ** decimal;
    };

    useEffect(() => {
        // handleCalculate();
    }, []);

    return (
        <div id="OrbitCreator" className="calculate-box">
            <h3>Orbit Creator</h3>
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
                <label>Perigee (km):</label>
                <input
                    type="text"
                    defaultValue={defaultR_p}
                    placeholder={defaultR_p}
                    onChange={(e) => setR_p(Number(e.target.value))}
                />

                {/* <label>Apogee (km):</label>
                <input
                    type="text"
                    defaultValue={defaultR_a}
                    placeholder={defaultR_a}
                    onChange={(e) => setR_a(Number(e.target.value))}
                /> */}

                <label>Eccentricity:</label>
                <input
                    type="text"
                    defaultValue={defaultE}
                    placeholder={defaultE}
                    onChange={(e) => setE(Number(e.target.value))}
                />
                <label>Periapsis Arg (deg):</label>
                <input
                    type="text"
                    defaultValue={defaultOmega}
                    placeholder={defaultOmega}
                    onChange={(e) => {
                        setOmega((Number(e.target.value) * Math.PI) / 180);
                    }}
                />

                <button className="calculate" onClick={handleCalculate}>
                    Calculate
                </button>
            </div>
            {/* <div className="output">
                <p>&Delta;V1-&gt; {round(output.DELTA_V_1, 4)} km/s</p>
            </div> */}
        </div>
    );
}
