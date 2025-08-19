import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middlewares/validate.js';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register',
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'cliente']),
  handleValidation,
  register
);

router.post('/login',
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  handleValidation,
  login
);

export default router;
