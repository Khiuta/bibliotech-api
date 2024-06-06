import { Router } from "express";

import bookController from "../../controllers/Management/BookController";
import managerLoginRequired from '../../middlewares/managerLoginRequired';
import studentLoginRequired from '../../middlewares/studentLoginRequired';

const router = Router();

router.post('/', bookController.store);
router.get('/', managerLoginRequired, bookController.index);
router.get('/ids', studentLoginRequired, bookController.userGetBooks);
router.get('/:id', studentLoginRequired, bookController.show);
router.post('/bulk', bookController.bulkStore);

export default router;
