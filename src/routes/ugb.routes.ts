import { Router } from "express";
import { ugbProductAdd, ugbProductDelete, ugbProductDetail, ugbProductList, ugbProductUpdate } from "../controllers/productsController";
import { addMember, createUgb, deleteMember, deleteUgb, membersList, ugbDetail, ugbList, updateMember, updateUgb } from "../controllers/ugbController";
import { addMemberChain, checkUgdId, deleteMemberChain, queryChain, ugbChain } from "../middlewares/ugbMiddleware";
import { addProdUgbChain } from "../middlewares/ugbProductMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/list",queryChain, validationHandlerMiddleware, ugbList)

router.route("/")
    .post(ugbChain, validationHandlerMiddleware, createUgb)

router.route("/:ugbId")
    .get(checkUgdId, validationHandlerMiddleware, ugbDetail)
    .patch(checkUgdId, validationHandlerMiddleware, updateUgb)
    .delete(checkUgdId, validationHandlerMiddleware, deleteUgb)

router.route("/:ugbId/members")
    .get(checkUgdId, validationHandlerMiddleware, membersList)
    .post(checkUgdId, addMemberChain, validationHandlerMiddleware, addMember)
    .patch(checkUgdId, addMemberChain, validationHandlerMiddleware, updateMember)
    .delete(checkUgdId, deleteMemberChain, validationHandlerMiddleware, deleteMember)
    
router.route("/:ugbId/products")
    .get(checkUgdId, validationHandlerMiddleware, ugbProductList)
    .post(checkUgdId, addProdUgbChain, validationHandlerMiddleware, ugbProductAdd)

router.route("/:ugbId/products/:productId")
    .get(checkUgdId, validationHandlerMiddleware, ugbProductDetail)
    .patch(checkUgdId, validationHandlerMiddleware, ugbProductUpdate)
    .delete(checkUgdId, validationHandlerMiddleware, ugbProductDelete)

export default router