import { Schema, model } from "mongoose";

const userSchema = new Schema({
    "username":{type:String, unique:true, required:[true, "Nombre de usuario requerido"]},
    "password":{type:String, required:[true, "Contraseña requerida"]},
    "cellphone":{type:String, default:null},
    "rol":{type:String, default:"USER"},
    "position":{type:String, required:[true, "cargo requerido"]}
},{
    collection:"UGB_User",
    versionKey:false
})

import mongooseHidden from "mongoose-hidden"
userSchema.plugin(mongooseHidden(),{hidden:{password:true}})

export const User = model("User",userSchema)
export interface userDbInterface {
    username:String,
    password:String,
    rol:String,
    position:String,
    cellphone:String
}