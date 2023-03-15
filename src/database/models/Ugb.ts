import { Schema, model } from "mongoose";

// const PostSchema = new Schema({

// })

const UgbSchema = new Schema({
    "area":{type:String, index:true, required:[true, "Es necesario un nombre para la UGB"]},
    // "members":{type:Schema.Types.ObjectId, ref:"User", default:[]},
    "manager":{type:Schema.Types.ObjectId, ref:"User", required:[true, "La ugb requiere un gerente a cargo"]},
    // "forum":{type:[PostSchema], default:[]}
},{
    "collection":"UGB_Ugb",
    "versionKey":false
})

export const Ugb = model("Ugb", UgbSchema)
export interface UgbInterface {
    area:String,
    members:Schema.Types.ObjectId[],
    manager:Schema.Types.ObjectId
}