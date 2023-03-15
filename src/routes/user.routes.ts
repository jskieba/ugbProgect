import { Router } from "express";
import { deleteUser, selfInfoUser, updateUser, userDetail, userList } from "../controllers/userController";
import { updateUserChain } from "../middlewares/userMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/list", userList)

router.route("/")
    .get(selfInfoUser)
    .patch(updateUserChain, validationHandlerMiddleware, updateUser)

router.route("/:userId")
    .get(userDetail)
    .patch(updateUser)
    .delete(deleteUser)

export default router