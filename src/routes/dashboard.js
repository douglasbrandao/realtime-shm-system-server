const { authMiddleware } = require('../auth');
const DashboardController = require('../controllers/DashboardController')
const { Router } = require('express');
const routes = Router()

routes.get('/dashboard', authMiddleware, DashboardController.getInfo)

module.exports = routes;