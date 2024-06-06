import { Router } from 'express';

import studentController from '../../controllers/Students/StudentController';
import studentLoginRequired from '../../middlewares/studentLoginRequired';

const router = Router();

router.get('/', studentController.index);
router.get('/one', studentLoginRequired, studentController.show);
router.post('/', studentController.store);

export default router;
