import { Router } from "express";
import { contactList, deleteUser, funcionariosList, selfInfoUser, updateUser, userDetail, userList } from "../controllers/userController";
import { queryChain } from "../middlewares/ugbMiddleware";
import { checkRol, updateUserChain } from "../middlewares/userMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.route("/")
    .get(selfInfoUser)
    .patch(updateUserChain, validationHandlerMiddleware, updateUser)

router.get("/list", queryChain, validationHandlerMiddleware, userList)
router.get("/funcionarios", queryChain, validationHandlerMiddleware, funcionariosList)
router.route("/contacts")
    .get(contactList)
    .post()
    .delete()

router.route("/:username")
    .get(userDetail)
    .patch(checkRol(["ADMIN"]), updateUserChain, validationHandlerMiddleware, updateUser)
    .delete(checkRol(["ADMIN"]),deleteUser)

export default router