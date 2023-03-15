"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const messagesSchema = new mongoose_1.Schema({
    "from": { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: [true, "emisor del mensaje obligatorio"] },
    "to": { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: [true, "Receptor del mensaje obligatorio"] },
    "tittle": { type: String, required: [true, "Titulo del mensaje obligatorio"] },
    "body": { type: String, required: [true, "Cuerpo del mensaje obligatorio"] },
    "importance": { type: String, required: [true, "importancia del mensaje requerido"], enum: ["importante", "peligro", "atencion", "informativo", "social"] },
    "read": { type: Boolean },
    "deleted": { type: Boolean, default: false }
}, {
    timestamps: {
        "createdAt": "date"
    },
    versionKey: false
});
const userSchema = new mongoose_1.Schema({
    "username": { type: String, unique: true, required: [true, "Nombre de usuario requerido"] },
    "password": { type: String, required: [true, "Contraseña requerida"] },
    "cellphone": { type: String, default: null },
    "rol": { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    "position": { type: String, enum: ["FUNCIONARIO", "GERENTE", "JEFE", "DIRECTOR"], required: [true, "cargo requerido"] },
    "document": { type: Number, unique: true, required: [true, "documento de identificacion requerido"] },
    "email": { type: String, default: null },
    "mailBox": { type: [messagesSchema], default: [] },
    "contacts": { type: (Array), default: [], ref: "User" }
}, {
    collection: "UGB_User",
    versionKey: false
});
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
userSchema.plugin((0, mongoose_hidden_1.default)(), { hidden: { password: true } });
messagesSchema.plugin((0, mongoose_hidden_1.default)(), { hidden: { deleted: true } });
exports.User = (0, mongoose_1.model)("User", userSchema);
