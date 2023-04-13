"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsProductsController_1 = require("../controllers/itemsProductsController");
const itemMiddleware_1 = require("../middlewares/itemMiddleware");
const router = (0, express_1.Router)({ "mergeParams": true });
router.route("/")
    .get(itemsProductsController_1.itemList)
    .post(itemsProductsController_1.createItem);
router.use("/:itemId*", itemMiddleware_1.checkitemId);
router.route("/:itemId")
    .get(itemsProductsController_1.itemDetail)
    .patch(itemsProductsController_1.updateItem)
    .delete(itemsProductsController_1.deleteItem);
exports.default = router;
