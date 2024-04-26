import React, { useState } from 'react';

import Hohmann from './Hohmann';
import OrbitCreator from './OrbitCreator';

export default function SwitchCalc({ setOrbits }) {
    const tab_options = [
        {
            tab_title: 'Hohmann',
            component: <Hohmann setOrbits={setOrbits} />,
            name: 'hohmann',
        },
        {
            tab_title: 'Orbit',
            component: <OrbitCreator setOrbits={setOrbits} />,
            name: 'orbit',
        },
    ];
    const [selected, setSelected] = useState(tab_options[0].name);

    return (
        <div id="SwitchCalc">
            <div className="tabs">
                {tab_options.map((option, key) => {
                    return (
                        <div
                            key={key}
                            className={`tab ${
                                selected === option.name ? 'selected' : ''
                            }`}
                            onClick={() => {
                                setSelected(option.name);
                            }}
                        >
                            {option.tab_title}
                        </div>
                    );
                })}
            </div>
            <div className="selected-tab">
                {tab_options.map((option, key) => {
                    return (
                        <div
                            className={`box-container ${
                                selected === option.name ? '' : 'hidden'
                            }`}
                            key={key}
                        >
                            {option.component}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
