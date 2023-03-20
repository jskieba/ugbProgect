import { Router } from "express";
import { addMember, createUgb, deleteMember, deleteUgb, membersList, ugbDetail, ugbList, updateMember, updateUgb } from "../controllers/ugbController";
import { addMemberChain, checkUgdId, deleteMemberChain, queryChain, ugbChain } from "../middlewares/ugbMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/list",queryChain, validationHandlerMiddleware, ugbList)

router.route("/")
    .post(ugbChain, validationHandlerMiddleware, createUgb)

router.route("/:ugbId")
    .get(checkUgdId, validationHandlerMiddleware, ugbDetail)
    .patch(checkUgdId, validationHandlerMiddleware, updateUgb)
    .delete(checkUgdId, validationHandlerMiddleware, deleteUgb)

router.route("/:ugbId/members")
    .get(checkUgdId, validationHandlerMiddleware, membersList)
    .post(checkUgdId, addMemberChain, validationHandlerMiddleware, addMember)
    .patch(checkUgdId, addMemberChain, validationHandlerMiddleware, updateMember)
    .delete(checkUgdId, deleteMemberChain, validationHandlerMiddleware, deleteMember)

export default router