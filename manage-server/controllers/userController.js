const ApiError = require('../error/ApiError')
const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration(req, res, next) {

        try {

            const {login, password} = req.body
            const candidate = await UserModel.findOne({where: {login}})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким email уже существует'})
            }

            const salt = parseInt(process.env.HASH_SALT)

            const hashPassword = bcrypt.hashSync(password, salt)

            const user = await UserModel.create({login, password: hashPassword})

            const token = generateJwt(user.id, user.login)

            return res.json({token})

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async login(req, res, next) {
        try {

            const {login, password} = req.body
            const user = await UserModel.findOne({where: {login}})

            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким Email не найден'))
            }

            const comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'))
            }

            const token = generateJwt(user.id, user.login)

            return res.json({token})

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }
    }

    async check(req, res, next) {

        try {

            const token = generateJwt(req.user.id, req.user.login)

            return res.json({token})

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new UserController()