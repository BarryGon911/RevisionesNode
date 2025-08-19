import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleValidation } from '../middlewares/validate.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { listCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controller.js';

const router = Router();

router.get('/', listCategories);
router.get('/:id', param('id').isMongoId(), handleValidation, getCategory);

router.post('/',
  requireAuth, requireRole('admin'),
  body('name').isString().isLength({ min: 2 }),
  body('description').optional().isString(),
  handleValidation,
  createCategory
);

router.put('/:id',
  requireAuth, requireRole('admin'),
  param('id').isMongoId(),
  body('name').isString().isLength({ min: 2 }),
  body('description').optional().isString(),
  handleValidation,
  updateCategory
);

router.delete('/:id',
  requireAuth, requireRole('admin'),
  param('id').isMongoId(),
  handleValidation,
  deleteCategory
);

export default router;
