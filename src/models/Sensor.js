const mongoose = require('../database');

const SensorSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    module: {
        type: mongoose.Types.ObjectId,
        ref: 'Module'
    },
    name: String,
    pinNumber: Number,
    status: {
        type: Number,
        default: 0
    }
})

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;