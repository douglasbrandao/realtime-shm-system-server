const Module = require('../models/Module')

class ModuleController {

    async add(req, res) {
        const { name, ipAddress, port } = req.body
        const userId = req.user.id

        const hasModule = await Module.findOne({ userId, name })

        if (!hasModule) {
            await Module.create({ name, ipAddress, port, userId })
                .then(response => res.status(201).json(response))
        }

        return res.status(400).json({ error: "There is already an Module with this name" })
    }

    async update(req, res) {
        const { moduleId } = req.params
        const body = req.body

        await Module.findByIdAndUpdate(moduleId, body, { new: true })
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async delete(req, res) {
        const { moduleId } = req.params

        await Module.findByIdAndDelete(moduleId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async read(req, res) {
        const { moduleId } = req.params
        await Module.findById(moduleId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(404).json(error))
    }

    async getByUser(req, res) {
        const userId = req.user.id
        await Module.find({ userId }).then(response => res.json(response))
    }
}

module.exports = new ModuleController;