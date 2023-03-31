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
exports.updateMember = exports.deleteMember = exports.addMember = exports.membersList = exports.deleteUgb = exports.createUgb = exports.updateUgb = exports.ugbDetail = exports.ugbList = void 0;
const catchAsync_1 = require("../helpers/catchAsync");
const http_errors_1 = __importDefault(require("http-errors"));
const succes_1 = require("../helpers/succes");
const Ugb_1 = require("../database/models/Ugb");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../database/models/User");
exports.ugbList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit || "10";
        const page = req.query.page || "0";
        const memberSelect = {
            "username": 1,
            "firstname": 1,
            "lastname": 1,
            "rol": 1,
            "position": 1,
            "email": 1
        };
        const ugbs = yield Ugb_1.Ugb.find().limit(parseInt(limit)).skip(parseInt(page)).populate("members.user", memberSelect);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Lista de UGBS!", body: ugbs });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`);
        return next(httpError);
    }
}));
exports.ugbDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbDetail = req.params.ugbId;
        const memberSelect = {
            "username": 1,
            "firstname": 1,
            "lastname": 1,
            "rol": 1,
            "position": 1,
            "email": 1
        };
        const ugb = yield Ugb_1.Ugb.findById(ugbDetail).populate("members.user", memberSelect).populate("boss", memberSelect);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡Detalle de Ugb!", body: ugb });
    }
    catch (error) {
        console.log(error);
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving UGB DETAIL] : ${error.message}`);
        return next(httpError);
    }
}));
exports.updateUgb = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const ugbUpdated = {
            "area": req.body.area,
            "boss": new mongoose_1.default.Types.ObjectId(req.body.boss)
        };
        let ugb = (yield Ugb_1.Ugb.findById(ugbId));
        if (ugbUpdated.boss) {
            yield User_1.User.findByIdAndUpdate(ugb.boss, { $pull: { JEFE: ugbId } });
            yield User_1.User.findByIdAndUpdate(ugb.boss, { $push: { JEFE: ugbId } });
        }
        const ugbUpdatedDb = yield ugb.updateOne(ugbUpdated);
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡UGB actualizada!", body: ugbUpdatedDb });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`);
        return next(httpError);
    }
}));
exports.createUgb = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbCreated = {
            "area": req.body.area,
            "boss": new mongoose_1.default.Types.ObjectId(req.body.manager)
        };
        const ugb = yield Ugb_1.Ugb.create(ugbCreated);
        yield User_1.User.findByIdAndUpdate(req.body.manager, { "$push": { "JEFE": ugb._id } });
        return (0, succes_1.endpointResponse)({ res, code: 201, message: "¡ UGB Creada !", body: ugb });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving UGB Create] - [ ugb/ - POST]: ${error.message}`);
        return next(httpError);
    }
}));
exports.deleteUgb = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const ugb = (yield Ugb_1.Ugb.findById(ugbId));
        const members = ugb.members;
        yield User_1.User.updateMany({ _id: { $in: members } }, { $set: { FUNCIONARIO: null } });
        yield User_1.User.findByIdAndUpdate(ugb.boss, { "$pull": { "JEFE": ugbId } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ UGB Eliminada !" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving UGB DELETE]: ${error.message}`);
        return next(httpError);
    }
}));
//MEMBERS
exports.membersList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const memberSelect = {
            "username": 1,
            "firstname": 1,
            "lastname": 1,
            "rol": 1,
            "position": 1,
            "email": 1
        };
        const ugb = (yield Ugb_1.Ugb.findById(ugbId).populate("members.user", memberSelect));
        const members = ugb.members;
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Miembros de Ugb !", body: members });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving UGB DELETE]: ${error.message}`);
        return next(httpError);
    }
}));
exports.addMember = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const ugb = (yield Ugb_1.Ugb.findById(ugbId));
        if (ugb.toObject().members.length > 10)
            return (0, succes_1.endpointResponse)({ res, code: 400, message: "¡ No se pueden agregar mas de 10 miembros por ugb!" });
        const memberId = req.body.memberId;
        const leader = req.body.leader;
        const user = yield User_1.User.findById(memberId);
        if (!user || user.FUNCIONARIO)
            return (0, succes_1.endpointResponse)({ res, code: 400, message: "¡ El miembro que quiere añadir ya esta asignado a otra ugb !" });
        yield ugb.updateOne({ "$push": { "members": { user: new mongoose_1.default.Types.ObjectId(memberId), leader } } });
        yield user.updateOne({ FUNCIONARIO: new mongoose_1.default.Types.ObjectId(ugbId) });
        return (0, succes_1.endpointResponse)({ res, code: 201, message: "¡ miembro añadido a UGB !" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving ADD Member]: ${error.message}`);
        return next(httpError);
    }
}));
exports.deleteMember = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const memberId = req.body.memberId;
        const user = yield User_1.User.findById(memberId);
        if (user && user.FUNCIONARIO && user.FUNCIONARIO.toString() === ugbId)
            yield user.updateOne({ FUNCIONARIO: null });
        yield Ugb_1.Ugb.findByIdAndUpdate(ugbId, { "$pull": { "members": { "user": new mongoose_1.default.Types.ObjectId(memberId) } } });
        return (0, succes_1.endpointResponse)({ res, code: 200, message: "¡ Miembro eliminado !" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving Member DELETE]: ${error.message}`);
        return next(httpError);
    }
}));
exports.updateMember = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ugbId = req.params.ugbId;
        const memberId = req.body.memberId;
        const leader = req.body.leader;
        const ugb = yield Ugb_1.Ugb.findOne({ _id: new mongoose_1.default.Types.ObjectId(ugbId), "members.user": new mongoose_1.default.Types.ObjectId(memberId) });
        if (!ugb)
            return (0, succes_1.endpointResponse)({ res, code: 400, message: "¡ No se encontro ese usuario dentro de la ugb!" });
        yield Ugb_1.Ugb.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(ugbId), "members.user": new mongoose_1.default.Types.ObjectId(memberId) }, {
            "members.$.leader": leader
        });
        return (0, succes_1.endpointResponse)({ res, code: 201, message: "¡ Miembro actualizado !" });
    }
    catch (error) {
        const httpError = (0, http_errors_1.default)(error.statusCode, `[Error retrieving Update Member]: ${error.message}`);
        return next(httpError);
    }
}));
