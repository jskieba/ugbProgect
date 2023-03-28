import { Router } from "express"
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

export default router