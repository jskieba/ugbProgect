"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const managerController_1 = require("../../controllers/getAllDataControllers/managerController");
const router = (0, express_1.Router)();
router.get("/", managerController_1.allDataBossManager);
router.get("/employees", managerController_1.allDataUgbManager);
exports.default = router;
