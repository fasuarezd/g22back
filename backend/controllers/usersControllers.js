const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Por favor teclea todos los datos')
    }

    //verificamos si ese usuario existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Ese usuario ya está registrado')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creamos al usuario en la bd
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo crear al usuario, favor de verificar sus datos')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //verificar email y password
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.name)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

//generamos el JWT
const generateToken = (id, name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: '60m'
    })
}



const getUserData = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getUserData
}

