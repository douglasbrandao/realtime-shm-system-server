const { authMiddleware } = require('../auth');
const StructureController = require('../controllers/StructureController')
const { Router } = require('express');
const routes = Router()

routes.post('/addStructure', authMiddleware, StructureController.add)
routes.put('/updateStructure/:structureId/', authMiddleware, StructureController.update)
routes.delete('/deleteStructure/:structureId', authMiddleware, StructureController.delete)
routes.get('/readStructure/:structureId', StructureController.read)
routes.get('/getStructuresByUser', authMiddleware, StructureController.getByUser)
routes.get('/getStructuresByModule/:moduleId', authMiddleware, StructureController.getByModule)

module.exports = routes;