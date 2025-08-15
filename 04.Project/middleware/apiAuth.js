import jwt from 'jsonwebtoken'
import { Usuario } from '../models/index.js'

export const apiAuth = async (req, res, next) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if(!token) return res.status(401).json({ error: { message: 'Token requerido' } })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)
    if(!usuario) return res.status(401).json({ error: { message: 'Token inválido' } })
    req.usuario = usuario
    next()
  } catch (e) {
    return res.status(401).json({ error: { message: 'Token inválido' } })
  }
}

export const requireRole = (role) => (req, res, next) => {
  if(!req.usuario) return res.status(401).json({ error: { message: 'No autenticado' } })
  if((req.usuario.role || 'cliente') !== role) return res.status(403).json({ error: { message: 'Permisos insuficientes' } })
  next()
}
