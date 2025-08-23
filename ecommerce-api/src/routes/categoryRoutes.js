import { Router } from 'express';
import { body, param } from 'express-validator';
import { listCategories, createCategory, updateCategory, deleteCategory } from '#controllers/categoriesController.js';
import { validate } from '#middlewares/validate.js';
import { auth } from '#middlewares/auth.js';

const router = Router();

router.get('/', listCategories);

router.post('/',
  auth(['admin']),
  [ body('name').notEmpty() ],
  validate,
  createCategory
);

router.put('/:id',
  auth(['admin']),
  [ param('id').isMongoId() ],
  validate,
  updateCategory
);

router.delete('/:id',
  auth(['admin']),
  [ param('id').isMongoId() ],
  validate,
  deleteCategory
);

export default router;
