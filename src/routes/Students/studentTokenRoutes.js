import { Router } from 'express';

import studentTokenController from '../../controllers/Students/StudentTokenController';

const router = Router();

router.post('/', studentTokenController.store);

export default router;
