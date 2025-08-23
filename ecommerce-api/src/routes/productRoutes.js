import { Router } from 'express';
import { body, param } from 'express-validator';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '#controllers/productsController.js';
import { validate } from '#middlewares/validate.js';
import { auth } from '#middlewares/auth.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', [param('id').isMongoId()], validate, getProduct);

router.post('/',
  auth(['admin']),
  [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
    body('category').isMongoId()
  ],
  validate,
  createProduct
);

router.put('/:id',
  auth(['admin']),
  [ param('id').isMongoId() ],
  validate,
  updateProduct
);

router.delete('/:id',
  auth(['admin']),
  [ param('id').isMongoId() ],
  validate,
  deleteProduct
);

export default router;
