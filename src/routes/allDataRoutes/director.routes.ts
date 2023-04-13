import { Router } from "express";
import { allDataBossDirector, allDataManagerDirector, allDataUgbsDirector } from "../../controllers/getAllDataControllers/directorController";
const router = Router()

//   manager
//   manager/boss
//   manager/boss/ugb
//   manager/boss/ugb/employees

router.get("/", allDataManagerDirector)
router.get("/ugb", allDataBossDirector)
router.get("/ugb/employeer", allDataUgbsDirector)

export default router