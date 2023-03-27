import { Router } from "express"
const router = Router()

router.route("/")
    .get()
    .post()
router.route("/:productId")
    .get()
    .patch()
    .delete()

export default router