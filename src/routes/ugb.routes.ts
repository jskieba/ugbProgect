import { Router } from "express";
import { addMember, createUgb, deleteMember, deleteUgb, membersList, ugbDetail, ugbList, updateMember, updateUgb } from "../controllers/ugbController";
const router = Router()

router.get("/list", ugbList)

router.route("/")
    .post(createUgb)

router.route("/:ugbId")
    .get(ugbDetail)
    .patch(updateUgb)
    .delete(deleteUgb)

router.route("/:ugbId/members")
    .get(membersList)
    .post(addMember)
    .patch(updateMember)
    .delete(deleteMember)

export default router