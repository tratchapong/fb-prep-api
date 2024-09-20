module.exports = (err, req, res, next) => {
  res.status(err.statusCode).json({error : err.message})
}