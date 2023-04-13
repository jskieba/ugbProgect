import { Router } from "express";
import { allDataBossManager, allDataUgbManager } from "../../controllers/getAllDataControllers/managerController";
const router = Router()


router.get("/", allDataBossManager)
router.get("/employees", allDataUgbManager)


export default router