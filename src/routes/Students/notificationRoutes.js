import { Router } from 'express';

import notificationController from '../../controllers/Students/NotificationController';

const router = Router();

router.post('/', notificationController.store);

export default router;
