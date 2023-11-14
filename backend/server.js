const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/products', (req, res) => {
    return res.status(200).json({
        message: 'Nueva funcionalidad agregada'
    })
})

//test



app.use(errorHandler)

app.listen(port, () => console.log(`Hello the Server started on port ${port}`))

