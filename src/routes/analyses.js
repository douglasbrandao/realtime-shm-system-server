const { authMiddleware } = require('../auth');
const AnalysisController = require('../controllers/AnalysisController')
const { Router } = require('express');
const routes = Router()

routes.post('/addAnalysis', authMiddleware, AnalysisController.add)
routes.delete('/deleteAnalysis/:analysisId', AnalysisController.delete)
routes.put('/updateAnalysis/:analysisId/', authMiddleware, AnalysisController.update)
routes.get('/readAnalysis/:analysisId', authMiddleware, AnalysisController.read)
routes.get('/getAnalysesByUser', authMiddleware, AnalysisController.getByUser)
routes.get('/getAnalysesByModule/:moduleId', AnalysisController.getByModule)
routes.get('/cleanFrequencies/:analysisId', AnalysisController.clean)

module.exports = routes;