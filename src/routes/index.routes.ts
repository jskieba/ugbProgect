import { checkPosition } from "../middlewares/userMiddleware";
import { Request, Response, Router } from "express";
import { endpointResponse } from "../helpers/succes";
import { checkToken } from "../middlewares/checkTokenMiddleware";
const router = Router()

router.get("/api/v1", (_req: Request, res: Response) => endpointResponse({ res, code: 200, status: true, message: "OK!" }))

import authRouter from "./auth.routes"
router.use("/api/v1/auth", authRouter)

import ugbRouter from "./ugb.routes"
router.use("/api/v1/ugb", checkToken, ugbRouter)

import managerRouter from "./manager.routes"
router.use("/api/v1/manager", checkToken, checkPosition(["GERENTE"]), managerRouter)

import userRouter from "./user.routes"
router.use("/api/v1/user", checkToken, userRouter)

export default router