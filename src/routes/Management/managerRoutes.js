import { Router } from "express";

import managerController from "../../controllers/Management/ManagerController";
import managerLoginRequired from "../../middlewares/managerLoginRequired";

const router = Router();

router.post('/', managerController.store);
router.get('/', managerController.index);
router.get('/one', managerLoginRequired, managerController.show);

export default router;
