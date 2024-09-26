const express = require('express')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')
const postRoute = express.Router()

postRoute.post('/', authenticate, upload.single('image'), (req, res) => {
  console.log(req.file)
  res.json({body : req.body, file : req.file})
})

module.exports = postRoute