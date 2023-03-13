import { Request, Response, Router } from "express";
import { login, register } from "../controllers/authController";
import { endpointResponse } from "../helpers/succes";
import { loginChainVal, registerChainVal } from "../middlewares/authMiddleware";
import validationHandlerMiddleware from "../middlewares/validationHandlerMiddleware";
const router = Router()

router.get("/*",(_req:Request, res:Response)=>endpointResponse({res, code:405, message:"Metodo GET no permitido, pruebe con POST"}))

router.post("/login", loginChainVal, validationHandlerMiddleware, login)
router.post("/register", registerChainVal, validationHandlerMiddleware, register)

export default router