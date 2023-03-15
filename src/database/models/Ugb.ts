import { Schema, model } from "mongoose";

const PostSchema = new Schema({

})

const UgbSchema = new Schema({
    "members":{type:Array<{user:Schema.Types.ObjectId, leader:Boolean}>, ref:"User", default:[]},
    "manager":{type:Schema.Types.ObjectId, ref:"User", required:[true, "La ugb requiere un gerente a cargo"]},
    "forum":{type:[PostSchema], default:[]}
},{
    "collection":"UGB_Ugb",
    "versionKey":false
})

export const Ugb = model("Ugb", UgbSchema)
export interface UgbInterface {
    members:Schema.Types.ObjectId[],
    manager:Schema.Types.ObjectId
}