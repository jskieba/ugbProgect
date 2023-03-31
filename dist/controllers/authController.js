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
exports.register = exports.login = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = require("bcrypt");
const User_1 = require("../database/models/User");
const succes_1 = require("../helpers/succes");
const tokenHelper_1 = require("../helpers/tokenHelper");
exports.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { JWTSECRET } = process.env;
        if (JWTSECRET === undefined)
            return (0, succes_1.endpointResponse)({ res, code: 500, "message": "Error del servidor" });
        const token = yield (0, tokenHelper_1.codeToken)(req.body.user);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Usuario logueado!", body: { token: "bearer " + token } });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving Login] - [ login - POST]: ${error.message}`);
        return next(httpError);
    }
}));
exports.register = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { SALTBCRYPT } = process.env;
        if (SALTBCRYPT === undefined)
            return true;
        let newUser = {
            "username": req.body.username,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "password": (0, bcrypt_1.hashSync)(req.body.password, parseInt(SALTBCRYPT)),
            "position": req.body.position,
            "cellphone": req.body.cellphone,
            "document": parseInt(req.body.document)
        };
        newUser[newUser.position] = null;
        yield User_1.User.create(newUser);
        return (0, succes_1.endpointResponse)({ res, code: 202, message: "Usuario creado" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving register] - [ Register - POST]: ${error.message}`);
        return next(httpError);
    }
}));
