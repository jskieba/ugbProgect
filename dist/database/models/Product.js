"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const item = new mongoose_1.Schema({
    "title": { type: String, required: [true, "El item requiere un nombre"] },
    "description": { type: String, default: null }
});
const ProductSchema = new mongoose_1.Schema({
    "name": { type: String, required: [true, "Se requiere un nombre de producto"] },
    "controlItems": { type: [item], required: [true, "requiere items"] },
    "requirements": { type: Number, default: 0 }
}, {
    collection: "UGB_Product",
    versionKey: false
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
