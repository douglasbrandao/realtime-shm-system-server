const mongoose = require('../database');

const ModuleSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    name: String,
    ipAddress: String,
    port: String,
})

const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;