"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bossController_1 = require("../../controllers/getAllDataControllers/bossController");
const router = (0, express_1.Router)();
//   /ugb
router.get("/", bossController_1.allDataUgbsBoss);
exports.default = router;
