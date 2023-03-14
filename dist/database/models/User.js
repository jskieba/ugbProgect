"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    "username": { type: String, unique: true, required: [true, "Nombre de usuario requerido"] },
    "password": { type: String, required: [true, "Contraseña requerida"] },
    "cellphone": { type: String, default: null },
    "rol": { type: String, default: "USER" },
    "position": { type: String, required: [true, "cargo requerido"] }
}, {
    collection: "UGB_User",
    versionKey: false
});
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
userSchema.plugin((0, mongoose_hidden_1.default)(), { hidden: { password: true } });
exports.User = (0, mongoose_1.model)("User", userSchema);
