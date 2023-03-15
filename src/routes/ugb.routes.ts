import { Router } from "express";
import { createUgb, deleteUgb, ugbDetail, ugbList, updateUgb } from "../controllers/ugbController";
const router = Router()

router.get("/list", ugbList)

router.route("/")
    .post(createUgb)

router.route("/:ugbId")
    .get(ugbDetail)
    .patch(updateUgb)
    .delete(deleteUgb)

export default router