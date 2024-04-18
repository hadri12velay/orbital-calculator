/**
 * Calculate Delta V1, Delta V2 and Delta V Total in a Circular Hohmann Transfer
 * @param {number} mu Standard gravitational parameter in km^(3)*s^(-2)
 * @param {number} r_1 First orbit radius in km
 * @param {number} r_2 Second orbit radius in km
 * @returns {Object} result Transfer velocities
 * @returns {number} result.Delta_1 Delta V 1 in km*^s^(-1)
 * @returns {number} result.Delta_2 Delta V 2 in km*^s^(-1)
 * @returns {number} result.Delta_Total Total Delta V for the transfer in km*^s^(-1)
 */
export const circularHohmann = ({ mu, r_1, r_2 }) => {
    const V_start = get_orbital_velocity({ mu, r: r_1 }); // Starting orbit velocity
    const V_end = get_orbital_velocity({ mu, r: r_2 }); // Final orbit velocity
    const ang_momentum_transfer = get_ang_momentum_h({
        mu,
        r_a: r_1,
        r_p: r_2,
    });
    const V_transfer_1 = get_orbital_velocity({
        h: ang_momentum_transfer,
        r: r_1,
    }); // Transfer orbit velocity at start altitude
    const V_transfer_2 = get_orbital_velocity({
        h: ang_momentum_transfer,
        r: r_2,
    }); // Transfer orbit velocity at end altitude
    const Delta_1 = V_transfer_1 - V_start;
    const Delta_2 = V_end - V_transfer_2;
    const Delta_Total = Math.abs(Delta_1) + Math.abs(Delta_2);
    const ang_momentum_start = get_ang_momentum_h({ mu, r: r_1 });
    const ang_momentum_end = get_ang_momentum_h({ mu, r: r_2 });
    return {
        Delta_1,
        Delta_2,
        Delta_Total,
        V_start,
        V_end,
        ang_momentum_start,
        ang_momentum_transfer,
        ang_momentum_end,
        V_transfer_1,
        V_transfer_2,
    };
};

export const get_ang_momentum_h = ({ mu, r, r_a, r_p }) => {
    if (r && !r_a && !r_p) r_p = r_a = r;
    const h = Math.sqrt((2 * mu * (r_a * r_p)) / (r_a + r_p));
    return h;
};

const get_orbital_velocity = ({ mu, r, h }) => {
    // for circular orbits, need mu and r only
    if (!h && mu) h = get_ang_momentum_h({ mu, r });
    return h / r;
};

export const test = () => {
    return circularHohmann({
        mu: 398600,
        r_1: 6700,
        r_2: 42240,
    }).Delta_2;
    // 2.420750140455956
    // 1.4644856607765782
    // 3.8852358012325343
};
