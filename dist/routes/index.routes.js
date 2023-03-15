"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const succes_1 = require("../helpers/succes");
const router = (0, express_1.Router)();
router.get("/api/v1", (_req, res) => (0, succes_1.endpointResponse)({ res, code: 200, status: true, message: "OK!" }));
const auth_routes_1 = __importDefault(require("./auth.routes"));
router.use("/api/v1/auth", auth_routes_1.default);
const ugb_routes_1 = __importDefault(require("./ugb.routes"));
router.use("/api/v1/ugb", ugb_routes_1.default);
const manager_routes_1 = __importDefault(require("./manager.routes"));
router.use("/api/v1/manager", manager_routes_1.default);
const user_routes_1 = __importDefault(require("./user.routes"));
router.use("/apo/v1/user", user_routes_1.default);
exports.default = router;
