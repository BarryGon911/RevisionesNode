import { Carrito, CarritoItem, Producto } from '../../models/index.js'

export const miCarrito = async (req, res, next) => {
  try {
    const carrito = await Carrito.findOrCreate({ where: { usuarioId: req.usuario.id }, defaults: { usuarioId: req.usuario.id } }).then(([c])=>c)
    const items = await CarritoItem.findAll({ where: { carritoId: carrito.id }, include: [Producto] })
    res.json({ id: carrito.id, items })
  } catch(e){ next(e) }
}

export const agregarItem = async (req, res, next) => {
  try {
    const { productoId, cantidad } = req.body
    const p = await Producto.findByPk(productoId)
    if(!p) return res.status(404).json({ error: { message: 'Producto no encontrado' } })
    if(p.stock < cantidad) return res.status(400).json({ error: { message: 'Stock insuficiente' } })
    const carrito = await Carrito.findOrCreate({ where: { usuarioId: req.usuario.id }, defaults: { usuarioId: req.usuario.id } }).then(([c])=>c)
    const [item, created] = await CarritoItem.findOrCreate({ where: { carritoId: carrito.id, productoId: p.id }, defaults: { cantidad: cantidad||1, precioUnitario: p.precio } })
    if(!created){
      item.cantidad = (cantidad || 1)
      await item.save()
    }
    res.status(201).json(item)
  } catch(e){ next(e) }
}

export const actualizarItem = async (req, res, next) => {
  try {
    const item = await CarritoItem.findByPk(req.params.itemId)
    if(!item) return res.status(404).json({ error: { message: 'Item no encontrado' } })
    const { cantidad } = req.body
    item.cantidad = cantidad
    await item.save()
    res.json(item)
  } catch(e){ next(e) }
}

export const eliminarItem = async (req, res, next) => {
  try {
    const item = await CarritoItem.findByPk(req.params.itemId)
    if(!item) return res.status(404).json({ error: { message: 'Item no encontrado' } })
    await item.destroy()
    res.status(204).send()
  } catch(e){ next(e) }
}
