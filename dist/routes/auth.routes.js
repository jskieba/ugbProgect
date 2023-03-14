"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const succes_1 = require("../helpers/succes");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)();
router.get("/*", (_req, res) => (0, succes_1.endpointResponse)({ res, code: 405, message: "Metodo GET no permitido, pruebe con POST" }));
router.post("/login", authMiddleware_1.loginChainVal, validationHandlerMiddleware_1.default, authController_1.login);
router.post("/register", authMiddleware_1.registerChainVal, validationHandlerMiddleware_1.default, authController_1.register);
exports.default = router;
