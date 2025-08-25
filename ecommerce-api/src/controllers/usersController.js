import User from '#models/User.js';
import { paginateQuery, buildPaginatedResult } from '#utils/pagination.js';

export const listUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const { skip } = paginateQuery({}, { page, limit });
    const [data, total] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit),
      User.countDocuments()
    ]);
    res.json(buildPaginatedResult({ data, total, page, limit }));
  } catch (e) { next(e); }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (e) { next(e); }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (e) { next(e); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (e) { next(e); }
};