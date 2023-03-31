import { Router } from "express"
import { createProduct, deleteProduct, productDetail, productList, updateProduct } from "../controllers/productsController"
import { queryChain } from "../middlewares/ugbMiddleware"
import { checkProductId } from "../middlewares/ugbProductMiddleware"
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware"
const router = Router()

router.route("/")
    .get(queryChain, validationHandlerMiddleware, productList)
    .post(createProduct)
router.use("/:productId*",checkProductId)
router.route("/:productId")
    .get(productDetail)
    .patch(updateProduct)
    .delete(deleteProduct)

import itemsRouter from "./items.routes"
router.use("/:productId/items",itemsRouter)


export default router