const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]

    if (!token) {
        return res.status(400).json({ message: 'You must authenticate' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "This token is not valid anymore" })
        req.user = { ...user, token: token }
        next()
    })
}

const signAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }, (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            })
    })
}

const signRefreshToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id: user._id, email: user.email },
            process.env.REFRESH_SECRET,
            {
                expiresIn: "1y"
            }, (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            })
    })
}

module.exports = {
    authMiddleware,
    signAccessToken,
    signRefreshToken
}