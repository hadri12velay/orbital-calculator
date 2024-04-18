export const get_kepler_elliptic = ({ mu, r, r_1, r_2 }) => {
    // only for 0 < e <= 1
    if (r) r_1 = r_2 = r;
    const r_a = Math.max(r_1, r_2);
    const r_p = Math.min(r_1, r_2);
    const a = (r_a + r_p) / 2; // semi-major axis
    const e = (r_a - r_p) / (r_a + r_p); // eccentricity
    const tau = 2 * Math.PI * Math.sqrt(a ** 3 / mu); // orbital period
    const n = Math.sqrt(mu / a ** 3); // mean motion
    const h = get_ang_momentum_h({ mu, r_a, r_p });
    const c = e * a;
    const b = Math.sqrt(r_a * r_p); // semi-minor axis
    const elements = {
        h,
        mu,
        r_a,
        r_p,
        a,
        e,
        tau,
        n,
        c,
        b,
    };
    return elements;
};

export const get_ang_momentum_h = ({ mu, r, r_a, r_p }) => {
    if (r && !r_a && !r_p) r_p = r_a = r;
    const h = Math.sqrt((2 * mu * (r_a * r_p)) / (r_a + r_p));
    return h;
};

export const changeOrbitStyle = ({ orbit, element, fit_ratio }) => {
    const zoom = fit_ratio;
    if (!orbit.omega) orbit.omega = 0;
    const width = orbit.a * 2 * zoom;
    const height = orbit.b * 2 * zoom;
    const translate = orbit.c * zoom;

    element.style['width'] = `${width}px`;
    element.style['height'] = `${height}px`;
    element.style[
        'transform'
    ] = `translate(-50%, -50%) translateX(${translate}px)`;

    if (orbit.mass) {
        element.classList.add('mass');
    }
    if (orbit.type) {
        element.classList.add(orbit.type);
    }
};
