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
exports.updateUgbProductChain = exports.addProdUgbChain = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const Product_1 = require("../database/models/Product");
exports.addProdUgbChain = [
    (0, express_validator_1.body)("productId")
        .custom((value, { req }) => {
        if (req.body.name && value)
            throw new Error("Solo puede añadir por ID o por nombre");
        if (value === undefined && req.body.name === undefined)
            throw new Error("Debe buscar una ugb por ID o nombre");
        return true;
    }).bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!value)
            return true;
        const product = yield Product_1.Product.findById(value);
        if (product === null)
            throw new Error("No existe una ugb con ese ID");
        if (!(0, mongoose_1.isObjectIdOrHexString)(value))
            throw new Error("Debe ser un hexadesimal con 24 caracteres");
        return true;
    })),
    (0, express_validator_1.body)("name")
        .custom((value, { req }) => {
        if (req.body.productId && value)
            throw new Error("Solo puede añadir por ID o por nombre");
        if (value === undefined && req.body.productId === undefined)
            throw new Error("Debe buscar una ugb por ID o nombre");
        return true;
    }).bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!value)
            return true;
        const product = yield Product_1.Product.findOne({ name: value });
        if (product === null)
            throw new Error("No existe una ugb con ese nombre");
        return true;
    })),
    (0, express_validator_1.body)("periodicity")
        .notEmpty().withMessage("El campo 'periodicity' no puede estar vacio").bail()
        .custom(value => {
        if (value != "SEMANAL" && value != "MENSUAL")
            throw new Error("El campo 'periodicity' debe contener el valor 'SEMANAL' o 'MENSUAL'");
        return true;
    }),
    (0, express_validator_1.body)("month")
        .notEmpty().withMessage("El campo 'month' no puede estar vacio")
];
exports.updateUgbProductChain = [
    (0, express_validator_1.body)("periodicity")
        .custom(value => {
        if (value === undefined)
            return true;
        if (value != "SEMANAL" && value != "MENSUAL")
            throw new Error("El campo 'periodicity' debe contener el valor 'SEMANAL' o 'MENSUAL'");
        return true;
    })
];
