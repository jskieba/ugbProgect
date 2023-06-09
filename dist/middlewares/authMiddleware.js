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
exports.registerChainVal = exports.loginChainVal = void 0;
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const User_1 = require("../database/models/User");
const letters = "abcdefghijklmnñopqrstuvwxyz";
const nums = "0123456789";
exports.loginChainVal = [
    (0, express_validator_1.body)("username")
        .notEmpty({ "ignore_whitespace": true }).withMessage("el campo 'username' no puede estar vacio").bail()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = (yield User_1.User.findOne({ username: value }).select({
            contacts: 0, mailBox: 0, cellphone: 0, email: 0, document: 0, FUNCIONARIO: 0, GERENTE: 0, DIRECTOR: 0, JEFE: 0
        }));
        if (!user)
            throw new Error("Usuario inexistente");
        req.body.user = user;
        return true;
    })),
    (0, express_validator_1.body)("password")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'password' no puede estar vacio").bail()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body.user === undefined)
            return true;
        if ((0, bcrypt_1.compareSync)(value, req.body.user.password)) {
            const userId = req.body.user._id;
            req.body.user = req.body.user.toObject();
            req.body.user.userId = userId;
            delete req.body.user.cellphone;
            return true;
        }
        throw new Error("Contraseña incorrecta");
    }))
];
exports.registerChainVal = [
    (0, express_validator_1.body)("username")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'username' no puede estar vacio").bail()
        .isLength({ min: 2, max: 12 }).withMessage("El 'usename' no puede ser mayor a 12 caracteres y menor a 2").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if ((yield User_1.User.findOne({ username: value })) !== null)
            throw new Error("nombre de usuario ocupado");
        return true;
    })),
    (0, express_validator_1.body)("password")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'password' no puede estar vacio").bail()
        .isLength({ min: 8, max: 12 }).withMessage("El 'password' no puede ser mayor a 12 y menor a 8").bail()
        .custom((value) => {
        let uper = false;
        let lower = false;
        let num = false;
        value.split("").some(letter => letters.includes(letter)) ? lower = true : null;
        value.split("").some(letter => letters.toUpperCase().includes(letter)) ? uper = true : null;
        value.split("").some(letter => nums.includes(letter)) ? num = true : null;
        if (!uper || !lower || !num)
            throw new Error("'password' debe contener al menos una letra mayuscula, minuscula y un numero");
        return true;
    }),
    (0, express_validator_1.body)("position")
        .notEmpty({ ignore_whitespace: true }).withMessage("El campo 'position' no puede estar vacio").bail()
        .isIn(["FUNCIONARIO", "GERENTE", "JEFE", "DIRECTOR"]).withMessage("El campo 'position' solo espera los valores : 'FUNCIONARIO', 'GERENTE', 'JEFE', 'DIRECTOR'"),
    (0, express_validator_1.body)("document")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'document' no puede estar vacio").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (isNaN(parseInt(value)))
            throw new Error("El campo 'document' debe ser un numero entero sin puntos ni comas");
        if (!(value.length >= 7 && value.length <= 9))
            throw new Error("El campo 'document' debe contener un dni valido");
        if ((yield User_1.User.findOne({ document: value })) !== null)
            throw new Error(`El documento ${value} ya esta registrado`);
        return true;
    })),
    (0, express_validator_1.body)("firstname")
        .notEmpty({ ignore_whitespace: true }).withMessage("El campo 'firstname' no puede estar vacio"),
    (0, express_validator_1.body)("lastname")
        .notEmpty({ ignore_whitespace: true }).withMessage("El campo 'lastname' no puede estar vacio"),
    (0, express_validator_1.body)("email").optional()
        .isEmail().withMessage("El campo 'email' debe contener un correo valido")
];
