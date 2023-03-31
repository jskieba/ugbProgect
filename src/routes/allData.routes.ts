import { Router } from "express";
import { checkPosition } from "../middlewares/userMiddleware";
const router = Router()

import boss from "./allDataRoutes/boss.routes"
router.use("/ugbs",checkPosition(["JEFE"]),boss)

import manager from "./allDataRoutes/manager.routes"
router.use("/bosses",checkPosition(["GERENTE"]), manager)

import director from "./allDataRoutes/director.routes"
router.use("/managers",checkPosition(["DIRECTOR"]), director)

export default router