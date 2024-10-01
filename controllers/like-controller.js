const prisma = require('../models')
const tryCatch = require("../utils/tryCatch");

module.exports.createLike = tryCatch( async (req, res) => {
  const {postId} = req.body
  const rs = await prisma.like.create({
    data : {userId : req.user.id, postId : +postId}
  })
  res.json(rs)
})

module.exports.deleteLike = tryCatch( async (req, res) => {
  const {id} = req.params
  const rs = await prisma.like.delete({
    where: {
      likeId: {
        userId: req.user.id,
        postId: +id,
      },
    },
  })
  res.json(rs)
})