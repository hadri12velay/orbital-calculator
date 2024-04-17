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
        const result = circularHohmann({
            mu: mu,
            r_1: R1,
            r_2: R2,
        });
        setOutput(result);
    };

    useEffect(() => {
        handleCalculate();
    }, []);

    return (
        <div id="Hohmann">
            <h3>Circular Hohmann Transfer</h3>
            <div className="input">
                <label>
                    &mu;:
                    <input
                        type="text"
                        defaultValue={defaultMu}
                        placeholder={defaultMu}
                        onChange={(e) => setMu(Number(e.target.value))}
                    />
                    km^(3)&#x2022;s^(-2)
                </label>
                <label>
                    Radius 1:
                    <input
                        type="text"
                        defaultValue={defaultR1}
                        placeholder={defaultR1}
                        onChange={(e) => setR1(Number(e.target.value))}
                    />
                    km
                </label>
                <label>
                    Radius 2:
                    <input
                        type="text"
                        defaultValue={defaultR2}
                        placeholder={defaultR2}
                        onChange={(e) => setR2(Number(e.target.value))}
                    />
                    km
                </label>
                <button onClick={handleCalculate}>Calculate</button>
            </div>
            <div className="output">
                <p>&Delta;V1-&gt; {output.Delta_1} km/s</p>
                <p>&Delta;V2-&gt; {output.Delta_2} km/s</p>
                <p>&Delta;V Total-&gt; {output.Delta_Total} km/s</p>
            </div>
        </div>
    );
}
