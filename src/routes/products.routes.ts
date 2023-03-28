import { Router } from "express"
import { createItem, deleteItem, itemDetail, itemList, updateItem } from "../controllers/itemsProductsController"
import { createProduct, deleteProduct, productDetail, productList, updateProduct } from "../controllers/productsController"
import { queryChain } from "../middlewares/ugbMiddleware"
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware"
const router = Router()

router.route("/")
    .get(queryChain, validationHandlerMiddleware, productList)
    .post(createProduct)
router.route("/:productId")
    .get(productDetail)
    .patch(updateProduct)
    .delete(deleteProduct)
router.route("/:productId/items")
    .get(itemList)
    .post(createItem)
router.route("/:productId/items/:itemId")
    .get(itemDetail)
    .patch(updateItem)
    .delete(deleteItem)

export default router