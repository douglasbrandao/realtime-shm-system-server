const mongoose = require('../database');

const AnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    module: {
        type: mongoose.Types.ObjectId,
        ref: 'Module'
    },
    structure: {
        type: mongoose.Types.ObjectId,
        ref: 'Structure'
    },
    currentSensor: {
        type: mongoose.Types.ObjectId,
        ref: 'Sensor',
        default: null
    },
    baseline: {
        sensorId: {
            type: mongoose.Types.ObjectId,
            ref: 'Sensor',
        },
        finished: {
            type: Boolean,
            default: false
        },
        frequencies: Array,
    },
    sensors: [{
        sensorId: {
            type: mongoose.Types.ObjectId,
            ref: 'Sensor',
        },
        frequencies: Array,
    }],
    status: {
        type: Number,
        default: 4
    },
    name: String,
    sweep: String,
    continuousConfig: {
        interval: Number,
        numberAnalyses: Number
    },
    createdAt: Date
})

const Analysis = mongoose.model('Analysis', AnalysisSchema);

module.exports = Analysis;