"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//   manager
//   manager/boss
//   manager/boss/ugb
//   manager/boss/ugb/employees
router.get("/");
router.get("/ugb");
router.get("/ugb/employeer");
exports.default = router;
