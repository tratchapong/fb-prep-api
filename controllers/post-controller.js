const fs = require('fs/promises')
const path = require('path')
const cloudinary = require('../config/cloudinary')
const prisma = require('../models')
const tryCatch = require('../utils/tryCatch')

module.exports.createPost = tryCatch( async (req, res) => {
	const {message} = req.body
	const haveFile = !!req.file
	let uploadResult = ''
	if(haveFile) {
		uploadResult = await cloudinary.uploader.upload(req.file.path,{
			public_id : path.parse(req.file.path).name 
		})
		fs.unlink(req.file.path)
	}
	const data = {
		message, image: uploadResult.secure_url || '', userId: req.user.id
	}
	 const rs = await prisma.post.create({data})
  res.json(rs)
})

module.exports.getAllPosts = tryCatch( async (req,res) => {
	const rs = await prisma.post.findMany({
		orderBy : {createdAt : 'desc'},
		include : {
			user : { 
				select : {
					firstName : true, lastName : true, profileImage : true
				}
			}
		}
		
	})
	res.json({posts : rs})
})


// module.exports.getAllPosts = tryCatch( async (req,res) => {
// 	const rs = await prisma.post.findMany({
// 		// where : { userId: req.user.id},
// 		orderBy : {createdAt : 'desc'}
		
// 	})
// 	res.json({posts : rs})
// })