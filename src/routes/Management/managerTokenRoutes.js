import { Router } from 'express';

import managerTokenController from '../../controllers/Management/ManagerTokenController';

const router = Router();

router.post('/', managerTokenController.store);

export default router;
