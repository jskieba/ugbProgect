import { Router } from "express";
const router = Router()

//   manager
//   manager/boss
//   manager/boss/ugb
//   manager/boss/ugb/employees

router.get("/")
router.get("/ugb")
router.get("/ugb/employeer")

export default router