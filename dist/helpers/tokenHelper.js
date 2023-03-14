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
exports.codeToken = exports.decodeToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const decodeToken = (codedToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { JWTSECRET } = process.env;
        const bearer = codedToken.split(" ")[0];
        if (bearer.toLowerCase() !== "bearer")
            throw new Error;
        if (!JWTSECRET)
            throw new Error;
        const decodedtoken = (0, jsonwebtoken_1.verify)(codedToken.split(" ")[1], Buffer.from(JWTSECRET, "base64"));
        return decodedtoken;
    }
    catch (error) {
        return false;
    }
});
exports.decodeToken = decodeToken;
const codeToken = (objectToCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { JWTSECRET } = process.env;
        if (!JWTSECRET)
            throw new Error;
        const token = (0, jsonwebtoken_1.sign)(objectToCode, Buffer.from(JWTSECRET, "base64"), { "expiresIn": "1d" });
        return token;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.codeToken = codeToken;
