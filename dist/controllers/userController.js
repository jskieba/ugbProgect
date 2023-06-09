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
exports.userDetail = exports.deleteUser = exports.updateUser = exports.selfInfoUser = exports.userList = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const succes_1 = require("../helpers/succes");
const http_errors_1 = __importDefault(require("http-errors"));
const User_1 = require("../database/models/User");
const helper_1 = require("../helpers/helper");
exports.userList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit || "10";
        const page = req.query.page || "0";
        const users = (yield User_1.User.find().limit(parseInt(limit)).skip(parseInt(page)).select({ mailBox: 0, contacts: 0 }))
            .map(user => {
            let cleanedUser = user.toJSON();
            cleanedUser = (0, helper_1.cleanUserProfile)(cleanedUser);
            return Object.assign(Object.assign({}, cleanedUser), { userId: user._id.toString() });
        });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Lista de usuarios !", body: { users, count: users.length } });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving User List] - [ user/list - GET]: ${error.message}`);
        return next(httpError);
    }
}));
exports.selfInfoUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body.token;
        const findUser = yield User_1.User.findOne({ username: user.username });
        const userId = findUser === null || findUser === void 0 ? void 0 : findUser._id.toString();
        user = findUser === null || findUser === void 0 ? void 0 : findUser.toJSON();
        user = (0, helper_1.cleanUserProfile)(user);
        const unreadMessages = findUser === null || findUser === void 0 ? void 0 : findUser.toObject().mailBox.reduce((count, mail) => {
            mail.read ? count++ : null;
            return count;
        }, 0);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Mi informacion!", body: Object.assign({ userId, contactAmount: user.contacts.length, unreadMessages }, user) });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving User Info] - [ user - GET]: ${error.message}`);
        return next(httpError);
    }
}));
exports.updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username || req.body.token.username;
        const patchUser = {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "username": req.body.username,
            "password": req.body.newPassword,
            "email": req.body.email,
            "cellphone": req.body.cellphone
        };
        const updatedUser = yield User_1.User.findOneAndUpdate({ username }, patchUser, { "new": false, "runValidators": true });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Usuario actualizado!", body: { updatedUser } });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving User Update] - [ user - PATCH]: ${error.message}`);
        return next(httpError);
    }
}));
exports.deleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield User_1.User.findOne({ username });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Usuario Eliminado con exito!", body: { user } });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving Delete User] - [ user - DELETE]: ${error.message}`);
        return next(httpError);
    }
}));
exports.userDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield User_1.User.findOne({ username }).select({ mailBox: 0, contacts: 0 });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Detalle de Usuario!", body: { user: (0, helper_1.cleanUserProfile)(user.toJSON()) } });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving User Detail] - [ user/id - GET]: ${error.message}`);
        return next(httpError);
    }
}));
