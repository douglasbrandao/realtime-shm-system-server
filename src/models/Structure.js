const mongoose = require('../database');

const StructureSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    moduleId: mongoose.Types.ObjectId,
    name: String,
    initialFrequency: Number,
    finalFrequency: Number,
    increments: Number,
    voltage: Number
})

const Structure = mongoose.model('Structure', StructureSchema);

module.exports = Structure;