require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const authRoute = require('./routes/auth-route')
const postRoute = require('./routes/post-route')
const commentRoute = require('./routes/comment-route')
const likeRoute = require('./routes/like-route')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/comment', commentRoute)
app.use('/like', likeRoute)

app.use(notFound)

app.use(errorMiddleware)

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on', port))

