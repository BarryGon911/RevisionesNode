import { exit } from 'node:process'
import categorias from './categorias.js'
import precios from './precios.js'
import usuarios from './usuarios.js'
import ecom_categorias from './ecom_categorias.js'
import productos from './productos.js'
import db from '../config/db.js'
import { Categoria, Precio, Usuario, CategoriaEcom, Producto } from '../models/index.js'

const importarDatos = async () => {
    try {
        // Autenticar 
        await db.authenticate()

        // Generar/actualizar las columnas (incluye e-commerce)
        await db.sync({ alter: true })

        // Insertamos los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios),
            CategoriaEcom.bulkCreate(ecom_categorias),
            Producto.bulkCreate(productos)
        ])

        console.log('Datos Importados Correctamente')
        exit()
        
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos Eliminados Correctamente');
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i") {
    importarDatos();
}

if(process.argv[2] === "-e") {
    eliminarDatos();
}