"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkitemId = void 0;
const mongoose_1 = require("mongoose");
const Product_1 = require("../database/models/Product");
const succes_1 = require("../helpers/succes");
const checkitemId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const itemId = req.params.itemId;
    if ((0, mongoose_1.isObjectIdOrHexString)(itemId)) {
        if (yield Product_1.Product.findById(productId, { controlItems: { $elemMatch: { _id: itemId } } })) {
            next();
        }
        else {
            (0, succes_1.endpointResponse)({ res, code: 200, message: "item inexistente" });
        }
    }
    else {
        (0, succes_1.endpointResponse)({ res, code: 400, message: "id de item invalido" });
    }
});
exports.checkitemId = checkitemId;
