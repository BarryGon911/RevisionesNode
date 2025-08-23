import { Router } from 'express';
import { param } from 'express-validator';
import { listUsers, getUser, updateUser, deleteUser } from '#controllers/usersController.js';
import { validate } from '#middlewares/validate.js';
import { auth } from '#middlewares/auth.js';

const router = Router();

router.get('/', auth(['admin']), listUsers);
router.get('/:id', auth(['admin']), [ param('id').isMongoId() ], validate, getUser);
router.put('/:id', auth(['admin']), [ param('id').isMongoId() ], validate, updateUser);
router.delete('/:id', auth(['admin']), [ param('id').isMongoId() ], validate, deleteUser);

export default router;
