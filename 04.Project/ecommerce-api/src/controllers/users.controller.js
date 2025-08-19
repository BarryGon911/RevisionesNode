import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { buildPagination } from '../utils/pagination.js';

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('-passwordHash');
  return res.json(user);
}

export async function listUsers(req, res) {
  const { page, limit, skip } = buildPagination(req.query);
  const [items, total] = await Promise.all([
    User.find().select('-passwordHash').skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);
  return res.json({ page, limit, total, items });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.role) updates.role = ['admin', 'cliente'].includes(req.body.role) ? req.body.role : undefined;
  if (req.body.password) updates.passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  return res.json(user);
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  return res.json({ message: 'Usuario eliminado' });
}