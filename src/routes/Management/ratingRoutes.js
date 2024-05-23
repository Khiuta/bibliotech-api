import { Router } from 'express';

import ratingController from '../../controllers/Management/RatingController';
import studentLoginRequired from '../../middlewares/studentLoginRequired';

const router = Router();

router.get('/');
router.post('/', studentLoginRequired,ratingController.store);

export default router;
