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
exports.deleteMemberChain = exports.addMemberChain = exports.checkUgdId = exports.queryChain = exports.ugbChain = void 0;
const express_validator_1 = require("express-validator");
const Ugb_1 = require("../database/models/Ugb");
const User_1 = require("../database/models/User");
exports.ugbChain = [
    (0, express_validator_1.body)("area")
        .notEmpty().withMessage("El campo 'area' no puede estar vacio"),
    (0, express_validator_1.body)("manager")
        .notEmpty().withMessage("El campo 'manager' no puede estar vacio").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findById(value);
        if (!user)
            throw new Error("El id de 'manager' no existe");
        return true;
    }))
];
exports.queryChain = [
    (0, express_validator_1.query)("limit").optional()
        .isInt({ "min": 1, "max": 100 }).withMessage("La query 'limit' debe ser un numero entero mayor a 0(cero) y menor a 100(cien)"),
    (0, express_validator_1.query)("page").optional()
        .isInt({ "min": 0 }).withMessage("La query 'page' debe ser un numero entero mayor a 0(cero)")
];
exports.checkUgdId = [
    (0, express_validator_1.param)("ugbId")
        .isHexadecimal().withMessage("Debe ser un mensaje exadecimal").bail()
        .isLength({ "min": 24, "max": 24 }).withMessage("Debe contener 24 caracteres").bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const ugb = yield Ugb_1.Ugb.findById(value);
        if (ugb === null)
            throw new Error("Ugb inexistente");
        return true;
    }))
];
exports.addMemberChain = [
    (0, express_validator_1.body)("memberId")
        .notEmpty().withMessage("El campo 'memberId' no debe estar vacio").bail()
        .isHexadecimal().withMessage("Debe ser un mensaje exadecimal").bail()
        .isLength({ "min": 24, "max": 24 }).withMessage("Debe contener 24 caracteres"),
    (0, express_validator_1.body)("leader")
        .notEmpty().withMessage("El campo 'leader' no puede estar vacio").bail()
        .isBoolean().withMessage("El campo 'leader' debe ser verdadero o falso")
];
exports.deleteMemberChain = [
    (0, express_validator_1.body)("memberId")
        .notEmpty().withMessage("El campo 'memberId' no debe estar vacio").bail()
        .isHexadecimal().withMessage("Debe ser un mensaje exadecimal").bail()
        .isLength({ "min": 24, "max": 24 }).withMessage("Debe contener 24 caracteres")
];
