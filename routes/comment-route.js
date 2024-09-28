const express = require('express')
const commentRoute = express.Router()
const commentController = require('../controllers/comment-controller')
const authenticate = require('../middlewares/authenticate')

commentRoute.post('/', authenticate, commentController.createComment)

module.exports = commentRoute