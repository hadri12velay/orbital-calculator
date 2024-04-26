import React, { useState } from 'react';

import Hohmann from './Hohmann';
import SwitchCalc from './SwitchCalc';
import Visual from './Visual';

export default function Content() {
    const [orbits, setOrbits] = useState([]);

    return (
        <div id="Content">
            {/* <Hohmann setOrbits={setOrbits} /> */}
            <SwitchCalc setOrbits={setOrbits} />
            <Visual orbits={orbits} />
        </div>
    );
}
