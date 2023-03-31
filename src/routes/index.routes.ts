import { Request, Response, Router } from "express";
import { endpointResponse } from "../helpers/succes";
import { checkToken } from "../middlewares/checkTokenMiddleware";
const router = Router()

router.get("/api/v1", (_req: Request, res: Response) => endpointResponse({ res, code: 200, status: true, message: "OK!" }))
router.get("/api/v1/makeMeACoffe", (_req: Request, res: Response) => endpointResponse({ res, code:418, message:"No, because I'm a teapot"}))

import authRouter from "./auth.routes"
router.use("/api/v1/auth", authRouter)

import ugbRouter from "./ugb.routes"
router.use("/api/v1/ugb", checkToken, ugbRouter)

import userRouter from "./user.routes"
router.use("/api/v1/user", checkToken, userRouter)

import productRouter from "./products.routes"
router.use("/api/v1/products", checkToken, productRouter)

import getAllData from "./allData.routes"
router.use("/api/v1/getAllData", checkToken, getAllData)

export default router