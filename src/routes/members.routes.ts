import { Router } from "express";
import { addMember, deleteMember, membersList, updateMember } from "../controllers/ugbController";
import { addMemberChain, deleteMemberChain } from "../middlewares/ugbMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router({"mergeParams":true})

router.route("/")
    .get(membersList)
    .post(addMemberChain, validationHandlerMiddleware, addMember)
    .patch(addMemberChain, validationHandlerMiddleware, updateMember)
    .delete(deleteMemberChain, validationHandlerMiddleware, deleteMember)

export default router