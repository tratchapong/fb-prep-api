const prisma = require('../models')
const tryCatch = require("../utils/tryCatch");

module.exports.createComment = tryCatch( async (req, res) => {
  const {message, postId} = req.body
  const userId = req.user.id

  const rs = await prisma.comment.create({
    data : { message, postId, userId}
  })
  res.json('createComment')
})