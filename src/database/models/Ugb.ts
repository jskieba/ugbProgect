import { Schema, model } from "mongoose";

// const PostSchema = new Schema({

// })

const UgbSchema = new Schema({
    "area":{type:String, index:true, required:[true, "Es necesario un nombre para la UGB"]},
    "members":{type:Array<{user:Schema.Types.ObjectId, leader:Boolean}>, ref:"User", default:[]},
    "manager":{type:Schema.Types.ObjectId, ref:"User", required:[true, "La ugb requiere un gerente a cargo"]}, 
    "products":{type:[{product:Schema.Types.ObjectId, completed:Number, periodicity:String, month:String}], ref:"Product", default:[]}
    // "forum":{type:[PostSchema], default:[]}
},{
    "collection":"UGB_Ugb",
    "versionKey":false
})

export const Ugb = model("Ugb", UgbSchema)
export interface UgbInterface {
    area:String,
    members:Schema.Types.ObjectId[],
    manager:Schema.Types.ObjectId,
    products:Array<{productId:Schema.Types.ObjectId, completed:Number, period:"SEMANAL"|"MENSUAL", month:String}>
}

// function arrayLimit(val:Array<any>) {
//     return val.length <= 10;
// }
