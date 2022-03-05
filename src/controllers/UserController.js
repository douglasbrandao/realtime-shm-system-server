const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { signAccessToken, signRefreshToken } = require('../auth');

class UserController {

    async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'There is no user registered with that email' })
        }

        const comparedPasswords = await bcrypt.compare(password, user.password)

        if (!comparedPasswords) {
            return res.status(400).json({ error: 'Password is incorrect' })
        }

        const userInfoWithoutPassword = { ...user._doc };
        delete userInfoWithoutPassword.password

        const token = await signAccessToken(user)
        const refreshToken = await signRefreshToken(user)

        return res.status(200).json({ user: userInfoWithoutPassword, token, refreshToken })
    }

    async add(req, res) {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            password: hashedPassword,
            avatar_url: req.file.path
        })
            .then(response => res.status(201).json({ message: 'Your account has been created' }))
            .catch(error => {
                if (error.code === 11000) {
                    const key = error.keyValue
                    if ('username' in key) {
                        return res.status(400).json({ error: 'An user is already using this username' })
                    } else if ('email' in key) {
                        return res.status(400).json({ error: 'An user is already using this email' })
                    }
                }
            })
    }

    async update(req, res) {
        const userId = req.user.id
        const { currentPassword, newPassword } = req.body
        const avatar_url = req.file.path

        await User.findByIdAndUpdate(userId, { new: true }, async (err, user, next) => {
            if (err) return next(err)
            const isValid = user.comparePassword(currentPassword)

            if (!isValid) {
                return res.status(400).json({ error: "That's not your current password" })
            }

            if (currentPassword === newPassword) {
                return res.status(400).json({ error: "The new password must be different from the current password" })
            }

            const password = await bcrypt.hash(newPassword, 10)

            user.avatar_url = avatar_url
            user.password = password
            user.save((err, user) => {
                if (err) return res.status(400).json(err)
                const userUpdated = { ...user }
                delete userUpdated.password
                return res.status(200).json({ message: "Password updated", userUpdated })
            })
        })
    }

    async getAll(req, res) {
        const users = await User.find()
        return res.status(200).json(users)
    }
}

module.exports = new UserController;