"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ugb = void 0;
const mongoose_1 = require("mongoose");
// const PostSchema = new Schema({
// })
const UgbSchema = new mongoose_1.Schema({
    "area": { type: String, index: true, required: [true, "Es necesario un nombre para la UGB"] },
    "members": { type: (Array), ref: "User", default: [] },
    "manager": { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: [true, "La ugb requiere un gerente a cargo"] },
    "products": { type: (Array), ref: "Product", default: [] }
    // "forum":{type:[PostSchema], default:[]}
}, {
    "collection": "UGB_Ugb",
    "versionKey": false
});
exports.Ugb = (0, mongoose_1.model)("Ugb", UgbSchema);
// function arrayLimit(val:Array<any>) {
//     return val.length <= 10;
// }
