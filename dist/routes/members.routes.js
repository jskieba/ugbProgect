"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ugbController_1 = require("../controllers/ugbController");
const ugbMiddleware_1 = require("../middlewares/ugbMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)({ "mergeParams": true });
router.route("/")
    .get(ugbController_1.membersList)
    .post(ugbMiddleware_1.addMemberChain, validationHandlerMiddleware_1.default, ugbController_1.addMember)
    .patch(ugbMiddleware_1.addMemberChain, validationHandlerMiddleware_1.default, ugbController_1.updateMember)
    .delete(ugbMiddleware_1.deleteMemberChain, validationHandlerMiddleware_1.default, ugbController_1.deleteMember);
exports.default = router;
