const express = require('express')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')
const postController = require('../controllers/post-controller')
const postRoute = express.Router()

postRoute.post('/', authenticate, upload.single('image') ,postController.createPost)
postRoute.get('/', authenticate, postController.getAllPosts)

module.exports = postRoute