import { Router } from "express";

import bookController from "../../controllers/Management/BookController";

const router = Router();

router.post('/', bookController.store);
router.get('/', bookController.index);

export default router;
