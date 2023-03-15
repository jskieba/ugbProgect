"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)();
router.get("/list", userController_1.userList);
router.route("/")
    .get(userController_1.selfInfoUser)
    .patch(userMiddleware_1.updateUserChain, validationHandlerMiddleware_1.default, userController_1.updateUser);
router.route("/:userId")
    .get(userController_1.userDetail)
    .patch(userController_1.updateUser)
    .delete(userController_1.deleteUser);
exports.default = router;
