const { authMiddleware } = require('../auth');
const ModuleController = require('../controllers/ModuleController')
const { Router } = require('express');

const routes = Router()

routes.post('/addModule/', authMiddleware, ModuleController.add)
routes.put('/updateModule/:moduleId/', authMiddleware, ModuleController.update)
routes.delete('/deleteModule/:moduleId', authMiddleware, ModuleController.delete)
routes.get('/readModule/:moduleId', ModuleController.read)
routes.get('/getModulesByUser', authMiddleware, ModuleController.getByUser)

module.exports = routes;