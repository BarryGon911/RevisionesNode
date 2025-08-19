import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { handleValidation } from '../middlewares/validate.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = Router();

router.get('/',
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('q').optional().isString(),
  query('category').optional().isMongoId(),
  handleValidation,
  listProducts
);

router.get('/:id', param('id').isMongoId(), handleValidation, getProduct);

router.post('/',
  requireAuth, requireRole('admin'),
  body('name').isString().isLength({ min: 2 }),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('category').isMongoId(),
  body('description').optional().isString(),
  handleValidation,
  createProduct
);

router.put('/:id',
  requireAuth, requireRole('admin'),
  param('id').isMongoId(),
  body('name').isString().isLength({ min: 2 }),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('category').isMongoId(),
  body('description').optional().isString(),
  handleValidation,
  updateProduct
);

router.delete('/:id',
  requireAuth, requireRole('admin'),
  param('id').isMongoId(),
  handleValidation,
  deleteProduct
);

export default router;