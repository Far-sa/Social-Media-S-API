const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')

const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')
const { setHeaders } = require('./middleware/headers')

//? Configuration
dotenv.config()
connectDB()

const app = express()

//? Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(setHeaders)
app.use(helmet())
app.use(morgan('common'))

//? Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

//? ERR Handler
app.use(errorHandler)

//?Lunch App
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Sever is Running on ${PORT}`)
})
