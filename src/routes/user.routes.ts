import { Router } from "express";
import { deleteUser, funcionariosList, selfInfoUser, updateUser, userDetail, userList } from "../controllers/userController";
import { queryChain } from "../middlewares/ugbMiddleware";
import { checkRol, updateUserChain } from "../middlewares/userMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/list", queryChain, validationHandlerMiddleware, userList)
router.get("/funcionarios", queryChain, validationHandlerMiddleware, funcionariosList)
router.route("/")
    .get(selfInfoUser)
    .patch(updateUserChain, validationHandlerMiddleware, updateUser)

router.route("/:username")
    .get(userDetail)
    .patch(checkRol(["ADMIN"]), updateUserChain, validationHandlerMiddleware, updateUser)
    .delete(checkRol(["ADMIN"]),deleteUser)

export default router