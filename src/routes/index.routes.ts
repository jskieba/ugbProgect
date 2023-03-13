import { Request, Response, Router } from "express";
import { endpointResponse } from "../helpers/succes";
const router = Router()

router.get("/api/v1",(_req:Request, res:Response)=>endpointResponse({res, code:200, status:true, message:"OK!"}))

import authRouter from "./auth.routes"
router.use("/api/v1/auth",authRouter)

export default router