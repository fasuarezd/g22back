const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]
            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //obtener el id del usuario del token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Sin autorizacion')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Sin autorizacion, no se proporciono ningun token')
    }
})

module.exports = { protect }

