import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleValidation } from '../middlewares/validate.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { me, listUsers, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/me', requireAuth, me);

router.get('/', requireAuth, requireRole('admin'), listUsers);

router.put('/:id',
  requireAuth, requireRole('admin'),
  param('id').isMongoId(),
  body('name').optional().isString().isLength({ min: 2 }),
  body('role').optional().isIn(['admin', 'cliente']),
  body('password').optional().isLength({ min: 6 }),
  handleValidation,
  updateUser
);

router.delete('/:id',
  requireAuth, requireRole('admin'),
  param('id').isMongoId(),
  handleValidation,
  deleteUser
);

export default router;
