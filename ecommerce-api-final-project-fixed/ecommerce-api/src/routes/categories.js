import { Router } from 'express';
import { body, param } from 'express-validator';
import validate from '../middlewares/validation.js';
import { list, getById, create, update, remove } from '../controllers/categoryController.js';
import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = Router();

router.get('/', list);
router.get('/:id', [ param('id').isMongoId() ], validate, getById);

router.post('/', [ auth, isAdmin, body('name').notEmpty() ], validate, create);
router.put('/:id', [ auth, isAdmin, param('id').isMongoId() ], validate, update);
router.delete('/:id', [ auth, isAdmin, param('id').isMongoId() ], validate, remove);

export default router;
