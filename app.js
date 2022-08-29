const express = require('express')
const dotenv = require('dotenv')

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

//? Routes
app.use('/', (req, res) => {
  res.send('Hello World')
})

//? ERR Handler
app.use(errorHandler)

//?Lunch App
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Sever is Running on ${PORT}`)
})
