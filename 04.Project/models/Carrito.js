import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Carrito = db.define('carritos', {
  // pertenece a un usuario; FK se asigna en associations
})

export default Carrito
