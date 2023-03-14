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
exports.Core = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const helper_1 = require("./helpers/helper");
const morgan_1 = __importDefault(require("morgan"));
const mongoDB_1 = require("./database/mongoDB");
class Core {
    static get instance() { return this._instance || (this._instance = new this()); }
    constructor() {
        this.app = (0, express_1.default)();
        this.http = null;
        this.https = null;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const { PORT, PROTOCOL, URLDB, JWTSECRET, SALTBCRYPT } = process.env;
            if (!PORT || !PROTOCOL || !URLDB || !JWTSECRET || !SALTBCRYPT)
                throw new Error("Faltan Variables de entorno");
            if (PROTOCOL !== "HTTP" && PROTOCOL !== "HTTPS")
                throw new Error("Protocolo invalido ,'HTTP' o 'HTTPS' permitidos");
            if (isNaN(parseInt(SALTBCRYPT)))
                throw new Error("la variable de entorno 'SALTBCRYPT' debe ser un numero");
            if (PROTOCOL === "HTTP") {
                this.http = http_1.default.createServer(this.app).listen(PORT, () => console.log(`=============== Servidor \x1b[32mHTTP escuchando\x1b[0m en puerto ${PORT} ===============`));
            }
            else {
                const key = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "./../cert/"));
                const cert = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "./../cert/"));
                this.https = https_1.default.createServer({ key, cert }, this.app).listen(PORT, () => { console.log(`=============== Servidor \x1b[32mHTTPS escuchando\x1b[0m en puerto ${PORT} ===============`); });
            }
            this.app.set("ENV", { PORT, PROTOCOL, URLDB });
            this.app.use((0, cors_1.default)());
            this.app.use((0, morgan_1.default)("dev"));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            yield (0, mongoDB_1.mongoosedb)(URLDB);
        });
    }
    close(err) {
        var _a, _b;
        if (err) {
            console.error("Sucedio un error con el servidor, ver en carpeta logs el error de manera mas detallada.");
            console.error(err.message);
            if (!(0, fs_1.existsSync)(path_1.default.join(__dirname, "./../logs")))
                (0, fs_1.mkdirSync)(path_1.default.join(__dirname, "./../logs"));
            (0, fs_1.appendFileSync)(path_1.default.join(__dirname, "./../logs/serverErrors.txt"), `${(0, helper_1.dateZoneString)((0, helper_1.dateNowTimestamp)(), 'zu-ZA', 'America/Argentina/Cordoba')}\n${err.stack}\n`, { "encoding": "ascii" });
        }
        (_a = this.http) === null || _a === void 0 ? void 0 : _a.close();
        (_b = this.https) === null || _b === void 0 ? void 0 : _b.close();
    }
}
exports.Core = Core;
