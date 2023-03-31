import { Router } from "express";
import { createItem, deleteItem, itemDetail, itemList, updateItem } from "../controllers/itemsProductsController";
import { checkitemId } from "../middlewares/itemMiddleware";
const router = Router({"mergeParams":true})

router.route("/")
    .get(itemList)
    .post(createItem)
router.use("/:itemId*",checkitemId)
router.route("/:itemId")
    .get(itemDetail)
    .patch(updateItem)
    .delete(deleteItem)

export default router