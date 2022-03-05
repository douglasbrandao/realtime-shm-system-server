const Module = require('../models/Module')
const Structure = require('../models/Structure')
const Sensor = require('../models/Sensor')
const Analysis = require('../models/Analysis')
const Damage = require('../models/Damage')


class DashboardController {

    async getInfo(req, res) {
        const userId = req.user.id;
        const modules = await Module.countDocuments({ userId })
        const structures = await Structure.countDocuments({ userId })
        const sensors = await Sensor.countDocuments({ userId })
        const analyses = await Analysis.countDocuments({ user: userId })
        const opts = [
            { path: 'sensor', select: '_id name module', populate: { path: 'module', select: '_id name' } },
        ]
        const damages = await Damage.find().populate(opts).limit(5).sort({ date: -1 })
            .then(response => response)
        return res.status(200).json({
            modules,
            structures,
            sensors,
            analyses,
            damages
        })
    }
}

module.exports = new DashboardController;