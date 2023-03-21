"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const managerController_1 = require("../controllers/managerController");
const router = (0, express_1.Router)();
router.route("/ugbs")
    .get(managerController_1.managerUgbList);
exports.default = router;
