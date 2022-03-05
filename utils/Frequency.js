module.exports = class Frequency {
    constructor(frequency, real, imaginary, magnitude, impedance, phase) {
        this.frequency = frequency;
        this.sample = {
            real: real,
            imaginary: imaginary,
            magnitude: magnitude,
            impedance: impedance,
            phase: phase
        };
    }
}
