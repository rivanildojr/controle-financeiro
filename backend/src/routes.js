import { Router } from 'express';

import UserController from './app/controllers/UserController';
import OperationController from './app/controllers/OperationController';

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.get('/operation', OperationController.index);
router.post('/operation/:id', OperationController.store);

export default router;
