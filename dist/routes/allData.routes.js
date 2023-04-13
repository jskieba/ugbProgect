"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const router = (0, express_1.Router)();
const boss_routes_1 = __importDefault(require("./allDataRoutes/boss.routes"));
router.use("/ugbs", (0, userMiddleware_1.checkPosition)(["JEFE"]), boss_routes_1.default);
const manager_routes_1 = __importDefault(require("./allDataRoutes/manager.routes"));
router.use("/bosses", (0, userMiddleware_1.checkPosition)(["GERENTE"]), manager_routes_1.default);
const director_routes_1 = __importDefault(require("./allDataRoutes/director.routes"));
router.use("/managers", (0, userMiddleware_1.checkPosition)(["DIRECTOR"]), director_routes_1.default);
exports.default = router;
