import { Router } from "express";
import { allDataUgbsBoss } from "../../controllers/getAllDataControllers/bossController";
const router = Router()


router.get("/")
router.get("/employees", allDataUgbsBoss)


export default router