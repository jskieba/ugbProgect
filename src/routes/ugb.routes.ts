import {  Router } from "express";
import { createUgb, deleteUgb, ugbDetail, ugbList, updateUgb } from "../controllers/ugbController";
import { checkUgbId, queryChain, ugbChain } from "../middlewares/ugbMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/list",queryChain, validationHandlerMiddleware, ugbList)

router.route("/")
    .post(ugbChain, validationHandlerMiddleware, createUgb)

router.use("/:ugbId*",checkUgbId)
router.route("/:ugbId")
    .get(ugbDetail)
    .patch(updateUgb)
    .delete(deleteUgb)

import membersRouter from "./ugbRoutes/members.routes"
router.use("/:ugbId/members",membersRouter)

import ugbProductsRouter from "./ugbRoutes/ugbProduct.routes"
router.use("/:ugbId/products",ugbProductsRouter)


export default router