export class Orbit {
    constructor({ mu, r_a, r_p, r, a, b, e, h, p, THETA, OMEGA, omega }) {
        this.mu = mu; // Standard Gravitational Parameter (km^3s^-2)
        this.r = r ?? this.r; // Radius at true anomaly
        this.r_a = r_a ?? this.r_a; // Apogee Radius (Far)
        this.r_p = r_p ?? this.r_p; // Perigee Radius (Close)
        this.e = e ?? this.e; // Eccentricity
        this.h = h ?? this.h; // Angular momentum
        this.a = a ?? this.a; // Semi-major Axis
        this.b = b ?? this.b; // Semi-minor Axis
        this.p = p ?? this.p; // Semi-latus Rectum
        this.THETA = THETA ? THETA : 0; // True Anomaly (RAD, from Perigee)
        this.OMEGA = OMEGA ? OMEGA : 0; // Longitude of Ascending node (RAD, from right horizontal)
        this.omega = omega ? omega : 0; // Argument of periapsis (RAD)

        this.setup();
    }
    setup() {
        this.is_circular = this.isCircular();

        if (this.e) [this.r_a, this.r_p] = this.getRadii();

        if (!this.h) this.h = this.getAngularMomentum(); // req: mu, r_a, r_p
        if (!this.a) this.a = this.getSemiMajor(); // req: r_a, r_p
        if (!this.p) this.p = this.getSemiLatus(); // req: mu, h
        if (!this.r) this.r = this.getRadius(); // req: p, q, THETA
        if (!this.e) this.e = this.getEccentricity(); // req: p, q, THETA

        this.c = this.e * this.a; // can't remember the name rn
        if (!this.b) this.b = Math.sqrt(this.r_a * this.r_p);
    }
    isCircular() {
        if (this.e === 0 || (this.r_a === this.r_p && this.r_a !== undefined)) {
            if (!this.r_a) this.r_a = this.r_p;
            if (!this.r_p) this.r_p = this.r_a;
            this.r = this.r_a;
            return true;
        }
        return false;
    }
    getRadii() {
        let r_a, r_p;

        if (this.r_a && !this.r_p) {
            r_p = (this.r_a * (1 - this.e)) / (1 + this.e);
            r_a = this.r_a;
        }
        if (this.r_p && !this.r_a) {
            r_a = (this.r_p * (1 + this.e)) / (1 - this.e);
            r_p = this.r_p;
        }

        return [r_a, r_p];
    }
    getVelocityTan(r) {
        // Tangential Velocity V
        const V_T = this.h / r;
        return V_T;
    }
    getAngularMomentum() {
        // Angular Momentum h
        const h = Math.sqrt(
            (2 * this.mu * (this.r_a * this.r_p)) / (this.r_a + this.r_p)
        );
        return h;
    }
    getRadius() {
        const r = this.p / (1 + this.e * Math.cos(this.THETA));
        return r;
    }
    getSemiMajor() {
        // Semi-major Axis
        const a = (this.r_a + this.r_p) / 2;
        return a;
    }
    getSemiLatus() {
        // Semi-latus Rectum
        const p = this.h ** 2 / this.mu;
        return p;
    }
    getEccentricity() {
        const e = (this.r_a - this.r_p) / (this.r_a + this.r_p);
        return e;
    }
}

export class Transfer extends Orbit {
    constructor(orbit1, orbit2) {
        super({ mu: orbit1.mu });
        this.start_orbit = orbit1;
        this.final_orbit = orbit2;
    }

    circularHohmann() {
        const r1 = this.start_orbit.r;
        const r2 = this.final_orbit.r;

        this.r_p = Math.min(r1, r2);
        this.r_a = Math.max(r1, r2);

        if (this.r_p === r2) {
            this.flipped = true;
            this.omega = Math.PI;
        }

        this.setup();

        // Velocities at the start and end of transfer
        this.V_transfer_1 = this.getVelocityTan(r1);
        this.V_transfer_2 = this.getVelocityTan(r2);
        // Delta Vs
        this.DELTA_V_1 =
            this.V_transfer_1 - this.start_orbit.getVelocityTan(r1);
        this.DELTA_V_2 =
            this.final_orbit.getVelocityTan(r2) - this.V_transfer_2;
        this.DELTA_V_total =
            Math.abs(this.DELTA_V_1) + Math.abs(this.DELTA_V_2);
    }
}
