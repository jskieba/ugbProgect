import { Schema, model } from "mongoose";

const item = new Schema({
    "title":{type:String, required:[true, "El item requiere un nombre"]},
    "description":{type:String, default:null}
})

const ProductSchema = new Schema({
    "name":{type:String, required:[true, "Se requiere un nombre de producto"]},
    "controlItems":{type:[item], required:[true, "requiere items"]},
    "requirements":{type:Number, default:0}
},{
    collection:"UGB_Product",
    versionKey: false
})

export const Product = model("Product", ProductSchema)