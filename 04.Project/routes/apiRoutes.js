import express from 'express'
import { propiedades } from '../controllers/apiController.js'
import { apiAuth, requireRole } from '../middleware/apiAuth.js'
import { body, param, query } from 'express-validator'
import * as Auth from '../controllers/api/authApiController.js'
import * as Productos from '../controllers/api/productoController.js'
import * as Categorias from '../controllers/api/categoriaController.js'
import * as Usuarios from '../controllers/api/usuarioApiController.js'
import * as Carrito from '../controllers/api/carritoController.js'
import * as Ordenes from '../controllers/api/ordenController.js'

const router = express.Router()

// Endpoints existentes (no tocar)
router.get('/propiedades', propiedades)

// Auth
router.post('/auth/register', [
  body('nombre').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], Auth.register)

router.post('/auth/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], Auth.login)

// Productos (público GET; admin para mutaciones)
router.get('/productos', [
  query('page').optional().isInt({ min:1 }),
  query('limit').optional().isInt({ min:1, max:100 })
], Productos.list)

router.post('/productos', apiAuth, requireRole('admin'), [
  body('nombre').notEmpty(),
  body('descripcion').notEmpty(),
  body('precio').isFloat({ gt: 0 }),
  body('stock').isInt({ min: 0 }),
  body('categoriaId').isInt({ min: 1 })
], Productos.create)

router.put('/productos/:id', apiAuth, requireRole('admin'), [
  param('id').isInt({ min: 1 })
], Productos.update)

router.delete('/productos/:id', apiAuth, requireRole('admin'), [
  param('id').isInt({ min: 1 })
], Productos.remove)

// Categorías públicas
router.get('/categorias', Categorias.listCategorias)

// Usuarios (solo admin)
router.get('/usuarios', apiAuth, requireRole('admin'), [
  query('page').optional().isInt({ min:1 }),
  query('limit').optional().isInt({ min:1, max:100 })
], Usuarios.list)

router.get('/usuarios/:id', apiAuth, requireRole('admin'), [
  param('id').isInt({ min: 1 })
], Usuarios.getOne)

router.put('/usuarios/:id', apiAuth, requireRole('admin'), [
  param('id').isInt({ min: 1 })
], Usuarios.update)

router.delete('/usuarios/:id', apiAuth, requireRole('admin'), [
  param('id').isInt({ min: 1 })
], Usuarios.remove)

// Carrito (usuario autenticado)
router.get('/carrito', apiAuth, Carrito.miCarrito)
router.post('/carrito/items', apiAuth, [
  body('productoId').isInt({ min: 1 }),
  body('cantidad').optional().isInt({ min: 1 })
], Carrito.agregarItem)
router.put('/carrito/items/:itemId', apiAuth, [
  param('itemId').isInt({ min: 1 }),
  body('cantidad').isInt({ min: 1 })
], Carrito.actualizarItem)
router.delete('/carrito/items/:itemId', apiAuth, [
  param('itemId').isInt({ min: 1 })
], Carrito.eliminarItem)

// Órdenes
router.post('/ordenes', apiAuth, Ordenes.crearOrden)
router.get('/ordenes/mias', apiAuth, Ordenes.misOrdenes)

export default router
