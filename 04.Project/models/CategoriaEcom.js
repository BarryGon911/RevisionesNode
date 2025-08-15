import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const CategoriaEcom = db.define('ecom_categorias', {
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
})

export default CategoriaEcom
