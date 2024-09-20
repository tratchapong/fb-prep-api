require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const authRoute = require('./routes/auth-route')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)

app.use(notFound)

app.use(errorMiddleware)

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on', port))

