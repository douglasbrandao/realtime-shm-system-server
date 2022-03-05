const Damage = require('../models/Damage')

class DamageController {
    async add(req, res) {
        const { sensorId } = req.body
        console.log(sensorId)
        await Damage.create({ sensor: sensorId, date: new Date() })
            .then(response => res.status(201).json(response))
    }
}

module.exports = new DamageController;