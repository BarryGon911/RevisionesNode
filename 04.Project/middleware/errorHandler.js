export default function errorHandler(err, req, res, next) {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Error interno'
  res.status(status).json({ error: { message, code: status } })
}
