"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const directorController_1 = require("../../controllers/getAllDataControllers/directorController");
const router = (0, express_1.Router)();
//   manager
//   manager/boss
//   manager/boss/ugb
//   manager/boss/ugb/employees
router.get("/", directorController_1.allDataManagerDirector);
router.get("/ugb", directorController_1.allDataBossDirector);
router.get("/ugb/employeer", directorController_1.allDataUgbsDirector);
exports.default = router;
