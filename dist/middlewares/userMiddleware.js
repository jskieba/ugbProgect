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
exports.updateUserChain = exports.checkRol = exports.checkPosition = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const http_errors_1 = __importDefault(require("http-errors"));
const succes_1 = require("../helpers/succes");
const express_validator_1 = require("express-validator");
const User_1 = require("../database/models/User");
const bcrypt_1 = require("bcrypt");
const letters = "abcdefghijklmnñopqrstuvwxyz";
const nums = "0123456789";
const checkPosition = (position) => {
    const response = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body.token;
            if (!position.includes(user.position))
                return (0, succes_1.endpointResponse)({ res, code: 401, message: `Solo autorizado para : ${position.join(", ")}` });
            next();
        }
        catch (error) {
            const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving check position]: ${error.message}`);
            return next(httpError);
        }
    }));
    return response;
};
exports.checkPosition = checkPosition;
const checkRol = (position) => {
    const response = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body.token;
            if (!position.includes(user.rol))
                return (0, succes_1.endpointResponse)({ res, code: 401, message: `Solo autorizado para : ${position.join(", ")}` });
            next();
        }
        catch (error) {
            const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving check Rol Middleware]: ${error.message}`);
            return next(httpError);
        }
    }));
    return response;
};
exports.checkRol = checkRol;
exports.updateUserChain = [
    (0, express_validator_1.body)("firstname").optional()
        .isLength({ min: 3, max: 12 }),
    (0, express_validator_1.body)("lastname").optional()
        .isLength({ min: 3, max: 12 }),
    (0, express_validator_1.body)("username").optional()
        .isLength({ min: 2, max: 12 }).withMessage("El 'usename' no puede ser mayor a 12 caracteres y menor a 2").bail()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const userFound = yield User_1.User.findOne({ username: value });
        if (userFound !== null && userFound._id.toString() !== req.body.token.userId)
            throw new Error("nombre de usuario ocupado");
        return true;
    })),
    (0, express_validator_1.body)("newPassword").optional()
        .isLength({ min: 8, max: 12 }).withMessage("El 'password' no puede ser mayor a 12 y menor a 8").bail()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!req.body.oldPassword)
            throw new Error("Si desea cambiar la contraseña: el campo 'oldPassword' no puede estar vacio");
        if (!(0, bcrypt_1.compareSync)(req.body.oldPassword, ((_a = (yield User_1.User.findOne({ _id: req.body.token.userId }))) === null || _a === void 0 ? void 0 : _a.password) || ""))
            throw new Error("la contraseña anterior no coincide");
        let uper = false;
        let lower = false;
        let num = false;
        value.split("").some(letter => letters.includes(letter)) ? lower = true : null;
        value.split("").some(letter => letters.toUpperCase().includes(letter)) ? uper = true : null;
        value.split("").some(letter => nums.includes(letter)) ? num = true : null;
        if (!uper || !lower || !num)
            throw new Error("'password' debe contener al menos una letra mayuscula, minuscula y un numero");
        return true;
    })),
    (0, express_validator_1.body)("email").optional()
        .isEmail().withMessage("El campo 'email' debe contener un correo valido")
];
