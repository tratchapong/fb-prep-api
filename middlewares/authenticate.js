const jwt = require('jsonwebtoken')
const prisma = require('../models')
const customError = require('../utils/customError')
const tryCatch = require('../utils/tryCatch')

module.exports = tryCatch(async (req,res,next) => {

  const authorization = req.headers.authorization
  if(!authorization || !authorization.startsWith('Bearer ')) {
    throw ( customError('Unauthorized', 401))
  }
  const token = authorization.split(' ')[1]
  if(!token) {
    throw( customError('Unauthorized', 401))
  }

  const {id} = jwt.verify(token, process.env.JWT_SECRET)

  const foundUser = await prisma.user.findUnique({ where : { id } })
  if(!foundUser) {
    throw( customError('Unauthorized', 401))
  }

  delete foundUser.password
  req.user = foundUser
  next()
})