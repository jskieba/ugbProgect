import { Router } from "express";
import { deleteUser, selfInfoUser, updateUser, userDetail, userList } from "../controllers/userController";
const router = Router()

router.get("/list", userList)

router.route("/")
    .get(selfInfoUser)
    .patch(updateUser)
    .delete(deleteUser)

router.route("/:userId")
    .get(userDetail)
    .patch(updateUser)
    .delete(deleteUser)

export default router