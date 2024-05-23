import { Router } from "express";

import bookController from "../../controllers/Management/BookController";

const router = Router();

router.post('/', bookController.store);
router.get('/', bookController.index);
router.get('/ids', bookController.userGetBookIds);
router.get('/:id', bookController.show);

export default router;
