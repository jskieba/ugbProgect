"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const ugbMiddleware_1 = require("../middlewares/ugbMiddleware");
const ugbProductMiddleware_1 = require("../middlewares/ugbProductMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)();
router.route("/")
    .get(ugbMiddleware_1.queryChain, validationHandlerMiddleware_1.default, productsController_1.productList)
    .post(productsController_1.createProduct);
router.use("/:productId*", ugbProductMiddleware_1.checkProductId);
router.route("/:productId")
    .get(productsController_1.productDetail)
    .patch(productsController_1.updateProduct)
    .delete(productsController_1.deleteProduct);
const items_routes_1 = __importDefault(require("./items.routes"));
router.use("/:productId/items", items_routes_1.default);
exports.default = router;
