import { Router } from "express";
import { ugbProductAdd, ugbProductDelete, ugbProductDetail, ugbProductList, ugbProductUpdate } from "../controllers/productsController";
import { addMember, createUgb, deleteMember, deleteUgb, membersList, ugbDetail, ugbList, updateMember, updateUgb } from "../controllers/ugbController";
import { addMemberChain, checkUgbId, deleteMemberChain, queryChain, ugbChain } from "../middlewares/ugbMiddleware";
import { addProdUgbChain } from "../middlewares/ugbProductMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/list",queryChain, validationHandlerMiddleware, ugbList)

router.route("/")
    .post(ugbChain, validationHandlerMiddleware, createUgb)

router.route("/:ugbId")
    .get(checkUgbId, ugbDetail)
    .patch(checkUgbId, updateUgb)
    .delete(checkUgbId, deleteUgb)

router.route("/:ugbId/members")
    .get(checkUgbId, membersList)
    .post(checkUgbId, addMemberChain, validationHandlerMiddleware, addMember)
    .patch(checkUgbId, addMemberChain, validationHandlerMiddleware, updateMember)
    .delete(checkUgbId, deleteMemberChain, validationHandlerMiddleware, deleteMember)
    
router.route("/:ugbId/products")
    .get(checkUgbId, ugbProductList)
    .post(checkUgbId, addProdUgbChain, validationHandlerMiddleware, ugbProductAdd)

router.route("/:ugbId/products/:productId")
    .get(checkUgbId, ugbProductDetail)
    .patch(checkUgbId, ugbProductUpdate)
    .delete(checkUgbId, ugbProductDelete)

export default router