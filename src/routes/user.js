const { authMiddleware } = require('../auth');
const UserController = require('../controllers/UserController')
const multer = require('multer')
const { Router } = require('express');

const routes = Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(new Error('This type of file is not accepted. Try uploading a jpeg/png file less than 4mb'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter: fileFilter
})

routes.post('/api/signup', upload.single('avatar'), UserController.add)
routes.post('/api/signin', UserController.login)
routes.get('/api/users', authMiddleware, UserController.getAll)
routes.put('/api/updateUser', authMiddleware, upload.single('newAvatar'), UserController.update)

module.exports = routes;