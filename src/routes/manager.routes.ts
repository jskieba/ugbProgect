import { Router } from "express";
import { managerUgbList } from "../controllers/managerController";
const router = Router()

router.route("/ugbs")
    .get(managerUgbList)

export default router