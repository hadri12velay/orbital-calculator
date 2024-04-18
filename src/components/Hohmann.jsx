import React, { useEffect, useState, useRef } from 'react';

import { circularHohmann, get_ang_momentum_h } from '../scripts/hohmann';
import { get_kepler_elliptic } from '../scripts/orbit';

export default function Hohmann({ orbits, setOrbits }) {
    const earthMu = 398600;
    const defaultMu = earthMu;
    const defaultR1 = 6700;
    const defaultR2 = 42164;
    const [mu, setMu] = useState(defaultMu);
    const [R1, setR1] = useState(defaultR1);
    const [R2, setR2] = useState(defaultR2);
    const [output, setOutput] = useState({});
    const [isEarth, setIsEarth] = useState(true);

    const handleCalculate = () => {
        console.log('Circular Hohmann Transfer');
        const result = circularHohmann({
            mu: mu,
            r_1: R1,
            r_2: R2,
        });
        setOutput(result);

        const earth = {
            mass: true,
            a: 6371,
            b: 6371,
            c: 0,
        };
        const orbits_obj = [
            earth,
            get_kepler_elliptic({ mu: mu, r: R1 }),
            {
                ...get_kepler_elliptic({ mu: mu, r_1: R1, r_2: R2 }),
                type: 'transfer',
            },
            get_kepler_elliptic({ mu: mu, r: R2 }),
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
                <p>&Delta;V1-&gt; {round(output.Delta_1, 4)} km/s</p>
                <p>&Delta;V2-&gt; {round(output.Delta_2, 4)} km/s</p>
                <p>&Delta;V Total-&gt; {round(output.Delta_Total, 4)} km/s</p>
            </div>
        </div>
    );
}
