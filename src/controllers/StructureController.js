const Structure = require('../models/Structure')


class StructureController {
    async add(req, res) {
        const { moduleId, name, initialFrequency, finalFrequency, increments, voltage } = req.body
        const userId = req.user.id

        const hasStructure = await Structure.findOne({ userId, moduleId, name })

        if (!hasStructure) {
            await Structure.create({
                userId, moduleId, name, initialFrequency,
                finalFrequency, increments, voltage
            }).then(response => res.status(201).json(response))
        }

        return res.status(400).json({ error: "There is already an structure with this name to this module" })
    }

    async update(req, res) {
        const { structureId } = req.params
        const body = req.body

        await Structure.findByIdAndUpdate(structureId, body, { new: true })
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async delete(req, res) {
        const { structureId } = req.params

        await Structure.findByIdAndDelete(structureId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async read(req, res) {
        const { structureId } = req.params
        await Structure.findById(structureId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async getByUser(req, res) {
        const userId = req.user.id
        await Structure.find({ userId }).then(response => res.json(response))
    }

    async getByModule(req, res) {
        const { moduleId } = req.params
        await Structure.find({ moduleId }).then(response => res.json(response))
    }
}

module.exports = new StructureController;