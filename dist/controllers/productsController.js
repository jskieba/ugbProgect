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
exports.ugbProductDelete = exports.ugbProductUpdate = exports.ugbProductAdd = exports.ugbProductDetail = exports.ugbProductList = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const http_errors_1 = __importDefault(require("http-errors"));
const succes_1 = require("../helpers/succes");
const Ugb_1 = require("../database/models/Ugb");
const Product_1 = require("../database/models/Product");
const mongoose_1 = require("mongoose");
//ONLY PRODUCTS
//PRODUCTS IN UGB
exports.ugbProductList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const products = (yield Ugb_1.Ugb.findOne({ _id: ugbId }).populate({ path: "products.product", model: Product_1.Product })).products;
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Lista de productos !", body: { products, count: products.length } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving Ugb Product List] - [ ugb/<ugbId>/product GET ]: ${error}`);
        return next(httpError);
    }
}));
exports.ugbProductDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ugbId = req.params.ugbId;
        const productId = req.params.productId;
        const product = (_a = (yield Ugb_1.Ugb.findById(ugbId, { products: { $elemMatch: { product: new mongoose_1.Schema.Types.ObjectId(productId) } } }).populate("products.product"))) === null || _a === void 0 ? void 0 : _a.products[0];
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Detalle de producto !", body: { product } });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - [ ]: ${error.message}`);
        return next(httpError);
    }
}));
exports.ugbProductAdd = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const productId = req.body.productId;
        const productName = req.body.productName;
        const product = (yield Product_1.Product.findOne({ $or: [{ _id: productId }, { name: productName }] }));
        const newProduct = {
            product: product._id,
            completed: 0,
            periodicity: req.body.periodicity,
            month: req.body.month
        };
        yield Ugb_1.Ugb.findByIdAndUpdate(ugbId, { $push: { products: newProduct } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Producto añadido !", body: product });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving add product to ugb] - [ugb/<ugbId>/product POST]: ${error}`);
        return next(httpError);
    }
}));
exports.ugbProductUpdate = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const productId = req.body.productId;
        const updateProduct = {
            "products.$.period": req.body.period,
            "products.$.month": req.body.month,
            "products.$.completed": req.body.completed
        };
        yield Ugb_1.Ugb.findOne({ _id: ugbId, "products.product": productId }, updateProduct);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Producto Actualizado!" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - [ ]: ${error.message}`);
        return next(httpError);
    }
}));
exports.ugbProductDelete = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const productId = req.params.productId;
        yield Ugb_1.Ugb.findByIdAndUpdate(ugbId, { $pull: { "products": { "product": new mongoose_1.Schema.Types.ObjectId(productId) } } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Producto removido de la ugb !" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - [ ]: ${error.message}`);
        return next(httpError);
    }
}));
