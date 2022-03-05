const Sensor = require('../models/Sensor')

class SensorController {
    async add(req, res) {
        const { module, name, pinNumber } = req.body
        const userId = req.user.id

        const hasSensor = await Sensor.findOne({ userId, module, name })

        if (!hasSensor) {
            await Sensor.create({ userId, module, name, pinNumber })
                .then(response => res.status(201).json(response))
        }

        return res.status(400).json({ error: "There is already an sensor with this name to this module" })
    }

    async delete(req, res) {
        const { sensorId } = req.params

        Sensor.findByIdAndDelete(sensorId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async update(req, res) {
        const { sensorId } = req.params
        const body = req.body

        await Sensor.findByIdAndUpdate(sensorId, body, { new: true })
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async read(req, res) {
        const { sensorId } = req.params

        const opts = [
            { path: 'module', select: '_id name' }
        ]

        await Sensor.findById(sensorId).populate(opts)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async getByUser(req, res) {
        const userId = req.user.id

        const opts = [
            { path: 'module', select: '_id name' }
        ]

        await Sensor.find({ userId }).populate(opts).then(response => res.status(200).json(response))
    }

    async getByModule(req, res) {
        const { moduleId } = req.params
        await Sensor.find({ module: moduleId }).then(response => res.status(200).json(response))
    }
}

module.exports = new SensorController;