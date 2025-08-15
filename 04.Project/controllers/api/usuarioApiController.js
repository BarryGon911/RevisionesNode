import { validationResult } from "express-validator";
import { Usuario } from "../../models/index.js";

export const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page||"1")
    const limit = parseInt(req.query.limit||"10")
    const offset = (page-1)*limit
    const { count, rows } = await Usuario.findAndCountAll({ limit, offset, attributes: { exclude: ["password","token"] } })
    res.json({ total: count, page, pages: Math.ceil(count/limit), results: rows })
  } catch(e){ next(e) }
}

export const getOne = async (req, res, next) => {
  try {
    const u = await Usuario.findByPk(req.params.id, { attributes: { exclude: ["password","token"] } })
    if(!u) return res.status(404).json({ error: { message: "Usuario no encontrado" } })
    res.json(u)
  } catch(e){ next(e) }
}

export const update = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const u = await Usuario.findByPk(req.params.id)
    if(!u) return res.status(404).json({ error: { message: "Usuario no encontrado" } })
    const { nombre, email, role } = req.body
    await u.update({ nombre, email, role })
    res.json({ id: u.id, nombre: u.nombre, email: u.email, role: u.role })
  } catch(e){ next(e) }
}

export const remove = async (req, res, next) => {
  try {
    const u = await Usuario.findByPk(req.params.id)
    if(!u) return res.status(404).json({ error: { message: "Usuario no encontrado" } })
    await u.destroy()
    res.status(204).send()
  } catch(e){ next(e) }
}