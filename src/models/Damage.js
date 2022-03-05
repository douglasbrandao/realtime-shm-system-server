const mongoose = require('../database');

const DamageSchema = new mongoose.Schema({
    sensor: {
        type: mongoose.Types.ObjectId,
        ref: 'Sensor'
    },
    date: Date
})

const Damage = mongoose.model('Damage', DamageSchema);

module.exports = Damage;