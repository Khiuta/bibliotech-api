import { Router } from 'express';

import noteController from '../../controllers/Management/NoteController';
import managerLoginRequired from '../../middlewares/managerLoginRequired';

const router = Router();

router.post('/', managerLoginRequired, noteController.store);
router.delete('/:id', managerLoginRequired, noteController.destroy);

export default router;
