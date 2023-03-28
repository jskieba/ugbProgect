"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const ugbController_1 = require("../controllers/ugbController");
const ugbMiddleware_1 = require("../middlewares/ugbMiddleware");
const ugbProductMiddleware_1 = require("../middlewares/ugbProductMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)();
router.get("/list", ugbMiddleware_1.queryChain, validationHandlerMiddleware_1.default, ugbController_1.ugbList);
router.route("/")
    .post(ugbMiddleware_1.ugbChain, validationHandlerMiddleware_1.default, ugbController_1.createUgb);
router.route("/:ugbId")
    .get(ugbMiddleware_1.checkUgbId, ugbController_1.ugbDetail)
    .patch(ugbMiddleware_1.checkUgbId, ugbController_1.updateUgb)
    .delete(ugbMiddleware_1.checkUgbId, ugbController_1.deleteUgb);
router.route("/:ugbId/members")
    .get(ugbMiddleware_1.checkUgbId, ugbController_1.membersList)
    .post(ugbMiddleware_1.checkUgbId, ugbMiddleware_1.addMemberChain, validationHandlerMiddleware_1.default, ugbController_1.addMember)
    .patch(ugbMiddleware_1.checkUgbId, ugbMiddleware_1.addMemberChain, validationHandlerMiddleware_1.default, ugbController_1.updateMember)
    .delete(ugbMiddleware_1.checkUgbId, ugbMiddleware_1.deleteMemberChain, validationHandlerMiddleware_1.default, ugbController_1.deleteMember);
router.route("/:ugbId/products")
    .get(ugbMiddleware_1.checkUgbId, productsController_1.ugbProductList)
    .post(ugbMiddleware_1.checkUgbId, ugbProductMiddleware_1.addProdUgbChain, validationHandlerMiddleware_1.default, productsController_1.ugbProductAdd);
router.route("/:ugbId/products/:productId")
    .get(ugbMiddleware_1.checkUgbId, productsController_1.ugbProductDetail)
    .patch(ugbMiddleware_1.checkUgbId, productsController_1.ugbProductUpdate)
    .delete(ugbMiddleware_1.checkUgbId, productsController_1.ugbProductDelete);
exports.default = router;
