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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.itemDetail = exports.itemList = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const http_errors_1 = __importDefault(require("http-errors"));
const succes_1 = require("../helpers/succes");
const Product_1 = require("../database/models/Product");
const mongoose_1 = __importDefault(require("mongoose"));
exports.itemList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = (yield Product_1.Product.findById(productId));
        const count = product.controlItems.length;
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Lista de items !", body: { product: product.name, items: product.controlItems, count } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.itemDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const itemId = req.params.itemId;
        const item = (yield Product_1.Product.findById(productId, { controlItems: { $elemMatch: { _id: itemId } }, name: 1 }));
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Detalle de item !", body: { item: item.controlItems[0], product: item.name } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.createItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const newItem = {
            title: req.body.title,
            description: req.body.description
        };
        yield Product_1.Product.findByIdAndUpdate(productId, { $push: { controlItems: newItem } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Item Creado !" });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.updateItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const itemId = req.params.itemId;
        const modifiedItem = {
            "controlItems.$.title": req.body.title,
            "controlItems.$.description": req.body.description
        };
        yield Product_1.Product.findOneAndUpdate({ _id: productId, "controlItems._id": itemId }, modifiedItem);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Item actualizado !" });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.deleteItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const itemId = req.params.itemId;
        yield Product_1.Product.findByIdAndUpdate(productId, { $pull: { controlItems: { _id: new mongoose_1.default.Types.ObjectId(itemId) } } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Item eliminado !" });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
