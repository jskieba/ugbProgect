"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/")
    .get()
    .post();
router.route("/:productId")
    .get()
    .patch()
    .delete();
exports.default = router;
