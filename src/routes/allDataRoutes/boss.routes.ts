import { Router } from "express";
import { allDataUgbsBoss } from "../../controllers/getAllDataControllers/bossController";
const router = Router()

//   /ugb
router.get("/", allDataUgbsBoss)

export default router