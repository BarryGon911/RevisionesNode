import jwt from 'jsonwebtoken';
import User from '#models/User.js';

export function auth(requiredRoles = []) {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      if (!token) return res.status(401).json({ error: 'Token requerido' });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id).lean();
      if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
      req.user = user;
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ error: 'No tienes permisos' });
      }
      next();
    } catch (e) {
      next({ status: 401, message: 'Token inválido' });
    }
  };
}