import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    return next();
  }
  catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'No autorizado' });
    return next();
  };
}