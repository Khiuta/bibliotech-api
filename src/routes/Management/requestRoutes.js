import { Router } from 'express';

import requestController from '../../controllers/Management/RequestController';

const router = Router();

router.get('/', requestController.index);
router.put('/:id/:action', requestController.update);
router.post('/', requestController.store);

export default router;
