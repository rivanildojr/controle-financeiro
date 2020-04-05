import { Router } from 'express';

import UserController from './app/controllers/UserController';
import OperationController from './app/controllers/OperationController';
import TransferController from './app/controllers/TransferController';

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.get('/operation', OperationController.index);
router.post('/operation/:id', OperationController.store);

router.get('/transfer', TransferController.index);
router.post('/transfer/:id', TransferController.store);

export default router;
