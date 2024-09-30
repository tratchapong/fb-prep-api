const express = require('express')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')
const postController = require('../controllers/post-controller')
const postRoute = express.Router()

postRoute.get('/', authenticate, postController.getAllPosts)
postRoute.post('/', authenticate, upload.single('image') ,postController.createPost)
postRoute.put('/:id', authenticate, upload.single('image') ,postController.editPost)
postRoute.delete('/:id', authenticate, postController.deletePost)

module.exports = postRoute