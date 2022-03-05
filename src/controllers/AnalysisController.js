const Analysis = require('../models/Analysis')
const Frequency = require('../../utils/Frequency')
const Structure = require('../models/Structure');

class AnalysisController {

    async add(req, res) {
        const { name, module, structure, baseline, sensors, sweep, continuousConfig } = req.body
        const { sensor, config } = req.body
        const user = req.user.id

        let analysis = await Analysis.findOne({ user, module, structure })

        if (!analysis) {
            analysis = await Analysis.create({
                createdAt: new Date(),
                user,
                name,
                module,
                structure,
                baseline,
                sensors,
                sweep,
                continuousConfig
            })
            return res.status(201).json(analysis)
        }

        const { increments } = await Structure.findById(structure)

        let response;

        if (config && analysis.baseline.frequencies.length === increments) {
            analysis.baseline.finished = true
        }

        if (config && !analysis.baseline.finished) {
            analysis.baseline.frequencies.push(new Frequency(
                config.frequency,
                config.real,
                config.imaginary,
                config.magnitude,
                config.impedance,
                config.phase
            ))
            response = await Analysis.findByIdAndUpdate(analysis._id, analysis, { new: true })
            return res.status(200).json(response)
        }

        if (config && analysis.baseline.finished && analysis.sensors) {

            analysis.sensors.forEach((element) => {
                if (element.sensorId == sensor && element.frequencies.length == increments) {
                    element.frequencies = []
                }
            })
        }

        if (config && analysis.baseline.finished && analysis.sensors) {

            analysis.sensors.forEach((element) => {
                if (element.sensorId == sensor && element.frequencies.length < increments) {
                    element.frequencies.push(new Frequency(
                        config.frequency,
                        config.real,
                        config.imaginary,
                        config.magnitude,
                        config.impedance,
                        config.phase
                    ))
                }
            })

            response = await Analysis.findByIdAndUpdate(analysis._id, analysis, { new: true })
            return res.status(200).json(response)
        }

        return res.status(400).json({ error: 'There is already an analysis with these information!' })
    }

    async delete(req, res) {
        const { analysisId } = req.params
        await Analysis.findByIdAndDelete(analysisId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async update(req, res) {
        const { analysisId } = req.params
        const { sensorId, status } = req.body
        await Analysis.findByIdAndUpdate(analysisId, { currentSensor: sensorId, status })
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async read(req, res) {
        const { analysisId } = req.params

        const opts = [
            { path: 'module', select: '_id name' },
            { path: 'structure', select: '_id name initialFrequency finalFrequency increments voltage' },
            { path: 'currentSensor', select: '_id name' },
            { path: 'baseline.sensorId', select: '_id name status' },
            { path: 'sensors.sensorId', select: '_id name status' }
        ]

        await Analysis.findById(analysisId).populate(opts)
            .then((response) => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async clean(req, res) {
        const { analysisId } = req.params

        const analysis = await Analysis.findById(analysisId)

        analysis.sensors.forEach((sensor) => {
            sensor.frequencies = []
        })

        await Analysis.findByIdAndUpdate(analysis._id, analysis)
            .then((response) => res.status(200))
    }

    async getByUser(req, res) {
        const user = req.user.id

        const opts = [
            { path: 'module', select: '_id name' },
            { path: 'structure', select: '_id name' },
            { path: 'baseline.sensorId', select: '_id name' },
            { path: 'sensors.sensorId', select: '_id name' }
        ]

        await Analysis.find({ user }).populate(opts)
            .then((response) => res.json(response))
            .catch((error) => res.status(404).json(error))
    }

    async getByModule(req, res) {
        const { moduleId } = req.params
        const opts = [
            { path: 'module', select: '_id name' },
            { path: 'structure', select: '_id name' },
            { path: 'baseline.sensorId', select: '_id name' },
            { path: 'sensors.sensorId', select: '_id name' }
        ]
        await Analysis.find({ module: moduleId }).populate(opts)
            .then(response => res.status(200).json(response))
    }
}

module.exports = new AnalysisController;