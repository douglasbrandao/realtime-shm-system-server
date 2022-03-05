const { authMiddleware } = require('../auth');
const SensorController = require('../controllers/SensorController')
const { Router } = require('express');
const routes = Router()

routes.post('/addSensor', authMiddleware, SensorController.add)
routes.put('/updateSensor/:sensorId', authMiddleware, SensorController.update)
routes.delete('/deleteSensor/:sensorId', SensorController.delete)
routes.get('/readSensor/:sensorId', SensorController.read)
routes.get('/getSensorsByUser', authMiddleware, SensorController.getByUser)
routes.get('/getSensorsByModule/:moduleId', authMiddleware, SensorController.getByModule)

module.exports = routes;