const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require('../utils/tryCatch')

module.exports.register = tryCatch(async (req, res, next) => {

  const { identity, firstName, lastName, password, confirmPassword } = req.body;
  // validation
  if (!(identity && firstName && lastName && password && confirmPassword)) {
    throw(customError("fill all required data", 400));
  }

  if (password !== confirmPassword) {
    throw(customError("password & confirm Password not match", 400));
  }

  // check identity is email or mobile

  let identityKey = ""
  if(/^[0-9]{10,15}$/.test(identity)) {
    identityKey = "mobile"
  }
  if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identity)) {
    identityKey = "email"
  }

  if(!identityKey) {
    throw(customError('only email or mobile for identity',400))
  }

  // ตรวจว่า email / mobile นี้มีแล้วหรือไม่ ถ้ามีก็แจ้ง error "Already have this email / mobile"

  const findIdentity = await prisma.user.findUnique({ where : { [identityKey] : identity } })
  if(findIdentity) {
    throw(customError(`Already have this ${identityKey}`,409))
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = { 
    [identityKey] : identity,
    password: hashedPassword,
    firstName, 
    lastName
  }

  await prisma.user.create({data : newUser})

  res.status(201).json({ msg: "Register Successfully" });
})

module.exports.login = tryCatch( async (req,res) => {
  const { identity,  password } = req.body;
  if (!(identity &&  password )) {
    throw(customError("fill all required data", 400));
  }
  // check identity is email or mobile
  let identityKey = ""
  if(/^[0-9]{10,15}$/.test(identity)) {
    identityKey = "mobile"
  }
  if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identity)) {
    identityKey = "email"
  }
  if(!identityKey) {
    throw(customError('only email or mobile for identity',400))
  }

  const foundUser = await prisma.user.findUnique({where : { [identityKey] : identity }})
  if(!foundUser) {
    throw(customError('invalid login', 401))
  }
  
  let pwOk = await bcrypt.compare(password, foundUser.password)
  if(!pwOk) {
    throw(customError('invalid login', 401))
  }
  const payload = {
    id: foundUser.id,
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '30d'})

  res.json({token})
} )

module.exports.getMe = (req,res) => {
  res.json({user : req.user})
}