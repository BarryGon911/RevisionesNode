import { validationResult } from "express-validator";
import { Producto, CategoriaEcom } from "../../models/index.js";

export const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page||"1")
    const limit = parseInt(req.query.limit||"10")
    const offset = (page-1)*limit
    const { count, rows } = await Producto.findAndCountAll({
      include: [CategoriaEcom],
      limit, offset
    })
    res.json({ total: count, page, pages: Math.ceil(count/limit), results: rows })
  } catch(e){ next(e) }
}

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { nombre, descripcion, precio, stock, categoriaId } = req.body
    const p = await Producto.create({ nombre, descripcion, precio, stock, categoriaId })
    res.status(201).json(p)
  } catch(e){ next(e) }
}

export const update = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const p = await Producto.findByPk(req.params.id)
    if(!p) return res.status(404).json({ error: { message: "Producto no encontrado" } })
    await p.update(req.body)
    res.json(p)
  } catch(e){ next(e) }
}

export const remove = async (req, res, next) => {
  try {
    const p = await Producto.findByPk(req.params.id)
    if(!p) return res.status(404).json({ error: { message: "Producto no encontrado" } })
    await p.destroy()
    res.status(204).send()
  } catch(e){ next(e) }
}