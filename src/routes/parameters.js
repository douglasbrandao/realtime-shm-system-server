const { authMiddleware } = require('../auth');
const ParameterController = require('../controllers/ParameterController')
const { Router } = require('express');
const routes = Router()

routes.put('/addParameters', authMiddleware, ParameterController.add)
routes.get('/readParameters', ParameterController.read)
routes.delete('/deleteParameters/:parameterId', ParameterController.delete)

module.exports = routes;