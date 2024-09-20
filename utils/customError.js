module.exports = (msg, statusCode) => {
  const error = new Error(msg)
  error.statusCode = statusCode || 500
  return error
}