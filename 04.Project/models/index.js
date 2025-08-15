import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Mensaje from './Mensaje.js'

Propiedad.belongsTo(Precio, { foreignKey: 'precioId'})
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaId'})
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioId'})
Propiedad.hasMany(Mensaje, { foreignKey: 'propiedadId'} )

Mensaje.belongsTo(Propiedad, { foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioId'})

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario, 
    Mensaje
}

import Producto from './Producto.js'
import CategoriaEcom from './CategoriaEcom.js'
import Carrito from './Carrito.js'
import CarritoItem from './CarritoItem.js'
import Orden from './Orden.js'
import OrdenItem from './OrdenItem.js'

// E-commerce associations
Producto.belongsTo(CategoriaEcom, { foreignKey: 'categoriaId' })
CategoriaEcom.hasMany(Producto, { foreignKey: 'categoriaId' })

Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Usuario.hasOne(Carrito, { foreignKey: 'usuarioId' })

CarritoItem.belongsTo(Carrito, { foreignKey: 'carritoId' })
Carrito.hasMany(CarritoItem, { foreignKey: 'carritoId' })
CarritoItem.belongsTo(Producto, { foreignKey: 'productoId' })
Producto.hasMany(CarritoItem, { foreignKey: 'productoId' })

Orden.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Usuario.hasMany(Orden, { foreignKey: 'usuarioId' })

OrdenItem.belongsTo(Orden, { foreignKey: 'ordenId' })
Orden.hasMany(OrdenItem, { foreignKey: 'ordenId' })
OrdenItem.belongsTo(Producto, { foreignKey: 'productoId' })
Producto.hasMany(OrdenItem, { foreignKey: 'productoId' })

export {
    Producto,
    CategoriaEcom,
    Carrito,
    CarritoItem,
    Orden,
    OrdenItem
}
