import { Router } from "express";

import managerController from "../../controllers/Management/ManagerController";
import managerLoginRequired from "../../middlewares/managerLoginRequired";

const router = Router();

router.post('/', managerLoginRequired, managerController.store);
router.get('/', managerLoginRequired, managerController.index);

export default router;
