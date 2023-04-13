"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ugbController_1 = require("../controllers/ugbController");
const ugbMiddleware_1 = require("../middlewares/ugbMiddleware");
const validationHandlerMiddleware_1 = __importDefault(require("../middlewares/validationHandlerMiddleware"));
const router = (0, express_1.Router)();
router.get("/list", ugbMiddleware_1.queryChain, validationHandlerMiddleware_1.default, ugbController_1.ugbList);
router.route("/")
    .post(ugbMiddleware_1.ugbChain, validationHandlerMiddleware_1.default, ugbController_1.createUgb);
router.use("/:ugbId*", ugbMiddleware_1.checkUgbId);
router.route("/:ugbId")
    .get(ugbController_1.ugbDetail)
    .patch(ugbController_1.updateUgb)
    .delete(ugbController_1.deleteUgb);
const members_routes_1 = __importDefault(require("./ugbRoutes/members.routes"));
router.use("/:ugbId/members", members_routes_1.default);
const ugbProduct_routes_1 = __importDefault(require("./ugbRoutes/ugbProduct.routes"));
router.use("/:ugbId/products", ugbProduct_routes_1.default);
exports.default = router;
