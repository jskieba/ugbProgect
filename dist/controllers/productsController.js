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
exports.ugbProductDelete = exports.ugbProductUpdate = exports.ugbProductAdd = exports.ugbProductDetail = exports.ugbProductList = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.productDetail = exports.productList = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const http_errors_1 = __importDefault(require("http-errors"));
const succes_1 = require("../helpers/succes");
const Ugb_1 = require("../database/models/Ugb");
const Product_1 = require("../database/models/Product");
const mongoose_1 = __importDefault(require("mongoose"));
//ONLY PRODUCTS
exports.productList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit || "10";
        const page = req.query.page || "0";
        const count = yield Product_1.Product.count();
        const products = yield Product_1.Product.find().limit(parseInt(limit)).skip(parseInt(page) * parseInt(limit));
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Lista de productos !", body: { products, count } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.productDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield Product_1.Product.findById(productId);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Detalle del producto !", body: { product } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.createProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = {
            "name": req.body.name,
            "requirements": parseInt(req.body.requirements),
            "controlItems": []
        };
        yield Product_1.Product.create(newProduct);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Producto Creado !" });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.updateProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updatedProduct = {
            "name": req.body.name,
            "requirements": parseInt(req.body.requirements)
        };
        yield Product_1.Product.findByIdAndUpdate(productId, updatedProduct);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Producto actualizado !" });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
exports.deleteProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield Product_1.Product.findByIdAndRemove(productId);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Producto Eliminado !" });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - []: ${error}`);
        return next(httpError);
    }
}));
//PRODUCTS IN UGB
exports.ugbProductList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit || "10";
        const page = req.query.page || "0";
        const ugbId = req.params.ugbId;
        const products = (yield Ugb_1.Ugb.findOne({ _id: ugbId }).limit(parseInt(limit)).skip(parseInt(page) * parseInt(limit)).populate({ path: "products.product", model: Product_1.Product })).products;
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Lista de productos !", body: { products, count: products.length } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving Ugb Product List] - [ ugb/<ugbId>/product GET ]: ${error}`);
        return next(httpError);
    }
}));
exports.ugbProductDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const productId = req.params.productId;
        const products = (yield Ugb_1.Ugb.findById(ugbId).populate("products.product")).products;
        const product = products.find((prod) => prod._id == productId);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Detalle de producto !", body: { product } });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - [ ]: ${error}`);
        return next(httpError);
    }
}));
exports.ugbProductAdd = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const productId = req.body.productId;
        const productName = req.body.name;
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
        const productId = req.params.productId;
        const updateProduct = {
            "products.$.period": req.body.period,
            "products.$.month": req.body.month,
            "products.$.completed": parseInt(req.body.completed)
        };
        yield Ugb_1.Ugb.findOneAndUpdate({ _id: ugbId, "products._id": new mongoose_1.default.Types.ObjectId(productId) }, updateProduct);
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
        yield Ugb_1.Ugb.findByIdAndUpdate(ugbId, { $pull: { "products": { "_id": new mongoose_1.default.Types.ObjectId(productId) } } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Producto removido de la ugb !" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - [ ]: ${error.message}`);
        return next(httpError);
    }
}));
