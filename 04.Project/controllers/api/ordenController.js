import { Carrito, CarritoItem, Orden, OrdenItem, Producto } from '../../models/index.js'

export const crearOrden = async (req, res, next) => {
  try {
    const carrito = await Carrito.findOne({ where: { usuarioId: req.usuario.id } })
    if(!carrito) return res.status(400).json({ error: { message: 'Carrito vacío' } })
    const items = await CarritoItem.findAll({ where: { carritoId: carrito.id }, include: [Producto] })
    if(!items.length) return res.status(400).json({ error: { message: 'Carrito vacío' } })
    let total = 0
    for(const it of items){
      total += parseFloat(it.precioUnitario) * it.cantidad
      // disminuir stock
      const p = await Producto.findByPk(it.productoId)
      p.stock = Math.max(0, p.stock - it.cantidad)
      await p.save()
    }
    const orden = await Orden.create({ usuarioId: req.usuario.id, total })
    for(const it of items){
      await OrdenItem.create({ ordenId: orden.id, productoId: it.productoId, cantidad: it.cantidad, precioUnitario: it.precioUnitario })
      await it.destroy()
    }
    res.status(201).json({ id: orden.id, total })
  } catch(e){ next(e) }
}

export const misOrdenes = async (req, res, next) => {
  try {
    const ordenes = await Orden.findAll({ where: { usuarioId: req.usuario.id } })
    res.json(ordenes)
  } catch(e){ next(e) }
}
