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
exports.allDataUgbManager = void 0;
const catchAsync_1 = require("../../helpers/catchAsync");
const succes_1 = require("../../helpers/succes");
const http_errors_1 = __importDefault(require("http-errors"));
const User_1 = require("../../database/models/User");
const Ugb_1 = require("../../database/models/Ugb");
const helper_1 = require("../../helpers/helper");
exports.allDataUgbManager = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.token.userId;
        const memberSelect = {
            "username": 1,
            "firstname": 1,
            "lastname": 1,
            "rol": 1,
            "position": 1,
            "email": 1
        };
        const allData = yield User_1.User.findById(userId)
            .populate({
            "path": "GERENTE",
            "model": User_1.User,
            "select": memberSelect,
            populate: { "path": "JEFE", "model": Ugb_1.Ugb, "populate": [
                    { "path": "members.user", "model": User_1.User, "select": memberSelect },
                    { "path": "boss", "model": User_1.User, "select": memberSelect }
                ] }
        });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Lista de UGBS a cargo!", body: (0, helper_1.cleanUserProfile)(allData.toJSON()) });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ] - [  - GET]: ${error.message}`);
        return next(httpError);
    }
}));
