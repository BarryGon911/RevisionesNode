import { validationResult } from "express-validator";
import { Usuario } from "../../models/index.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../../helpers/tokens.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { nombre, email, password, role } = req.body
    const existe = await Usuario.findOne({ where: { email } })
    if(existe) return res.status(400).json({ error: { message: "Email ya registrado" } })
    const hash = await bcrypt.hash(password, 10)
    const user = await Usuario.create({ nombre, email, password: hash, role: role || "cliente", confirmado: 1 })
    const token = generarJWT({ id: user.id, nombre: user.nombre })
    res.status(201).json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, role: user.role } })
  } catch(e){ next(e) }
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { email, password } = req.body
    const user = await Usuario.findOne({ where: { email } })
    if(!user) return res.status(400).json({ error: { message: "Credenciales inválidas" } })
    const ok = await bcrypt.compare(password, user.password)
    if(!ok) return res.status(400).json({ error: { message: "Credenciales inválidas" } })
    const token = generarJWT({ id: user.id, nombre: user.nombre })
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, role: user.role || "cliente" } })
  } catch(e){ next(e) }
}