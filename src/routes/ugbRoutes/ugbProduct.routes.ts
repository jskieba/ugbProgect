import { Router } from "express";
import { ugbProductAdd, ugbProductDelete, ugbProductDetail, ugbProductList, ugbProductUpdate } from "../../controllers/productsController";
import { addProdUgbChain } from "../../middlewares/ugbProductMiddleware";
import validationHandlerMiddleware from "../../middlewares/validationHandlerMiddleware";
const router = Router({"mergeParams":true})

router.route("/")
    .get(ugbProductList)
    .post(addProdUgbChain, validationHandlerMiddleware, ugbProductAdd)

router.route("/:productId")
    .get(ugbProductDetail)
    .patch(ugbProductUpdate)
    .delete(ugbProductDelete)

export default router