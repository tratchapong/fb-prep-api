const express = require('express')
const authenticate = require('../middlewares/authenticate')
const likeController = require('../controllers/like-controller')
const likeRoute = express.Router()

likeRoute.post('/', authenticate, likeController.createLike)
likeRoute.delete('/:id', authenticate, likeController.deleteLike)

module.exports = likeRoute