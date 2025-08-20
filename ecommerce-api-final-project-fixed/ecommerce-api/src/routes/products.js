import { Router } from 'express';
import { body, param, query } from 'express-validator';
import validate from '../middlewares/validation.js';
import { list, getById, create, update, remove } from '../controllers/productController.js';
import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = Router();

router.get('/', [
  query('page').optional().isInt({ min:1 }),
  query('limit').optional().isInt({ min:1, max:100 })
], validate, list);

router.get('/:id', [ param('id').isMongoId() ], validate, getById);

router.post('/', [
  auth, isAdmin,
  body('name').notEmpty(),
  body('price').isFloat({ min:0 }),
  body('category').isMongoId()
], validate, create);

router.put('/:id', [
  auth, isAdmin,
  param('id').isMongoId()
], validate, update);

router.delete('/:id', [ auth, isAdmin, param('id').isMongoId() ], validate, remove);

export default router;
