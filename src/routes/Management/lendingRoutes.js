import { Router } from 'express';

import lendingController from '../../controllers/Management/LendingController';
import managerLoginRequired from '../../middlewares/managerLoginRequired';

const router = Router();

router.get('/', lendingController.index);
router.post('/', lendingController.store);

export default router;
