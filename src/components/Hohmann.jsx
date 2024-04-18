import React, { useEffect, useState } from 'react';

import { test, circularHohmann } from '../scripts/hohmann';

export default function Hohmann() {
    const log = test();
    const defaultMu = 398600;
    const defaultR1 = 6700;
    const defaultR2 = 42240;
    const [mu, setMu] = useState(defaultMu);
    const [R1, setR1] = useState(defaultR1);
    const [R2, setR2] = useState(defaultR2);
    const [output, setOutput] = useState({});

    const handleCalculate = () => {
        console.log('Circular Hohmann Transfer');
        const result = circularHohmann({
            mu: mu,
            r_1: R1,
            r_2: R2,
        });
        setOutput(result);
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
                <label>
                    &mu; (km<sup>3</sup>s<sup>-2</sup>):
                </label>
                <input
                    type="text"
                    defaultValue={defaultMu}
                    placeholder={defaultMu}
                    onChange={(e) => setMu(Number(e.target.value))}
                />

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
