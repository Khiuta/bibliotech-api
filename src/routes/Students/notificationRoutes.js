import { Router } from 'express';

import notificationController from '../../controllers/Students/NotificationController';
import studentLoginRequired from '../../middlewares/studentLoginRequired';

const router = Router();

router.post('/', notificationController.store);
router.delete('/clear-all', studentLoginRequired, notificationController.clear);

export default router;
