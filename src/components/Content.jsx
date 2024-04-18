import React, { useState } from 'react';

import Hohmann from './Hohmann';
import Visual from './Visual';

export default function Content() {
    const [orbits, setOrbits] = useState([]);

    return (
        <div id="Content">
            <Hohmann orbits={orbits} setOrbits={setOrbits} />
            <Visual orbits={orbits} />
        </div>
    );
}
