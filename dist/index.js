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
require("dotenv").config();
const server_1 = require("./server");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const succes_1 = require("./helpers/succes");
const core = server_1.Core.instance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield core.start();
        //http handlers
        core.app.use(index_routes_1.default);
        core.app.use((_req, res, _next) => {
            return (0, succes_1.endpointResponse)({ res, code: 404, message: "URL invalida" });
        });
        core.app.use((err, _req, res, _next) => {
            console.error(err);
            if (err.status === 400 && err.type === "entity.parse.failed")
                return (0, succes_1.endpointResponse)({ res, code: 400, message: "JSON invalido" });
            return (0, succes_1.endpointResponse)({ res, code: 500, body: { error: "Error interno del servidor." } });
        });
    }
    catch (err) {
        core.close(err);
    }
}))();
