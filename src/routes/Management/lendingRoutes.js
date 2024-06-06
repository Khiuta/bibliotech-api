import { Router } from 'express';

import lendingController from '../../controllers/Management/LendingController';
import managerLoginRequired from '../../middlewares/managerLoginRequired';
import studentLoginRequired from '../../middlewares/studentLoginRequired';

const router = Router();

router.get('/', lendingController.index);
router.get('/current_book', studentLoginRequired, lendingController.GetStudentLending);

router.post('/', managerLoginRequired, lendingController.store);

router.put('/:id/:book_id', managerLoginRequired, lendingController.ReturnBookUpdate);
router.put('/:book_id/', managerLoginRequired, lendingController.DelayReturnDateUpdate);

export default router;
