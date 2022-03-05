const { authMiddleware } = require('../auth');
const DamageController = require('../controllers/DamageController')
const { Router } = require('express');
const routes = Router()

routes.post('/addDamage', authMiddleware, DamageController.add)

module.exports = routes;