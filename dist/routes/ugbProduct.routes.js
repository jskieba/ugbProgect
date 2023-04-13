"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const ugbProductMiddleware_1 = require("../middlewares/ugbProductMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)({ "mergeParams": true });
router.route("/")
    .get(productsController_1.ugbProductList)
    .post(ugbProductMiddleware_1.addProdUgbChain, validationHandlerMiddleware_1.default, productsController_1.ugbProductAdd);
router.route("/:productId")
    .get(productsController_1.ugbProductDetail)
    .patch(productsController_1.ugbProductUpdate)
    .delete(productsController_1.ugbProductDelete);
exports.default = router;
