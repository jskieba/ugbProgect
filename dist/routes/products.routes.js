"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsProductsController_1 = require("../controllers/itemsProductsController");
const productsController_1 = require("../controllers/productsController");
const itemMiddleware_1 = require("../middlewares/itemMiddleware");
const ugbMiddleware_1 = require("../middlewares/ugbMiddleware");
const ugbProductMiddleware_1 = require("../middlewares/ugbProductMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)();
router.route("/")
    .get(ugbMiddleware_1.queryChain, validationHandlerMiddleware_1.default, productsController_1.productList)
    .post(productsController_1.createProduct);
router.route("/:productId")
    .get(ugbProductMiddleware_1.checkProductId, productsController_1.productDetail)
    .patch(ugbProductMiddleware_1.checkProductId, productsController_1.updateProduct)
    .delete(ugbProductMiddleware_1.checkProductId, productsController_1.deleteProduct);
router.route("/:productId/items")
    .get(ugbProductMiddleware_1.checkProductId, itemsProductsController_1.itemList)
    .post(ugbProductMiddleware_1.checkProductId, itemsProductsController_1.createItem);
router.route("/:productId/items/:itemId")
    .get(ugbProductMiddleware_1.checkProductId, itemMiddleware_1.checkitemId, itemsProductsController_1.itemDetail)
    .patch(ugbProductMiddleware_1.checkProductId, itemMiddleware_1.checkitemId, itemsProductsController_1.updateItem)
    .delete(ugbProductMiddleware_1.checkProductId, itemMiddleware_1.checkitemId, itemsProductsController_1.deleteItem);
exports.default = router;
