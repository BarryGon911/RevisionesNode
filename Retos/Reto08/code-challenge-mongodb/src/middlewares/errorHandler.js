/**
 * Middleware de manejo de errores.
 * Si llega un error no gestionado, responde 500 con mensaje genérico.
 * (Tus controladores ya devuelven 4xx/404 específicos cuando aplica.)
 */
export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Error del servidor" });
}
