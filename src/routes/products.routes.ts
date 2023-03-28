import { Router } from "express"
import { createItem, deleteItem, itemDetail, itemList, updateItem } from "../controllers/itemsProductsController"
import { createProduct, deleteProduct, productDetail, productList, updateProduct } from "../controllers/productsController"
import { checkitemId } from "../middlewares/itemMiddleware"
import { queryChain } from "../middlewares/ugbMiddleware"
import { checkProductId } from "../middlewares/ugbProductMiddleware"
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware"
const router = Router()

router.route("/")
    .get(queryChain, validationHandlerMiddleware, productList)
    .post(createProduct)
router.route("/:productId")
    .get( checkProductId, productDetail)
    .patch( checkProductId, updateProduct)
    .delete( checkProductId, deleteProduct)
router.route("/:productId/items")
    .get( checkProductId, itemList)
    .post( checkProductId, createItem)
router.route("/:productId/items/:itemId")
    .get( checkProductId, checkitemId, itemDetail)
    .patch( checkProductId, checkitemId, updateItem)
    .delete( checkProductId, checkitemId, deleteItem)

export default router