import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
    "from":{type:Schema.Types.ObjectId, ref:"User", required:[true, "emisor del mensaje obligatorio"]},
    "to":{type:Schema.Types.ObjectId, ref:"User", required:[true, "Receptor del mensaje obligatorio"]},
    "tittle":{type:String, required:[true, "Titulo del mensaje obligatorio"]},
    "body":{type:String, required:[true, "Cuerpo del mensaje obligatorio"]},
    "importance":{type:String, required:[true, "importancia del mensaje requerido"], enum:["importante", "peligro", "atencion", "informativo", "social"]},
    "read":{type:Boolean},
    "deleted":{type:Boolean, default:false}
},{
    timestamps:{
        "createdAt":"date"
    },
    versionKey:false
})

const userSchema = new Schema({
    "username":{type:String, unique:true, required:[true, "Nombre de usuario requerido"]},
    "firstname":{type:String, required:[true, "primer nombre requerido"]},
    "lastname":{type:String, required:[true, "apellido requerido"]},
    "password":{type:String, required:[true, "Contraseña requerida"]},
    "cellphone":{type:String, default:null},
    "rol":{type:String, enum:["USER", "ADMIN"], default:"USER"},
    "position":{type:String, enum:["FUNCIONARIO", "GERENTE", "JEFE", "DIRECTOR"], required:[true, "cargo requerido"]},
    "document":{type:Number, min:999999, max:999999999,unique:true, required:[true, "documento de identificacion requerido"]},
    "email":{type:String, default:null},
    "ugb":{type:Schema.Types.ObjectId, ref:"Ugb", default:null},
    "mailBox":{type:[messagesSchema], default:[]},
    "contacts":{type:Array<Schema.Types.ObjectId>, default:[], ref:"User"}
},{
    collection:"UGB_User",
    versionKey:false
})

import mongooseHidden from "mongoose-hidden"
import { importanceTypes, userPositions, userRoles } from "../../interfaces/interfaces";
userSchema.plugin(mongooseHidden(),{hidden:{password:true}})
messagesSchema.plugin(mongooseHidden(),{ hidden:{deleted:true}})

export const User = model("User",userSchema)
export interface userDbInterface {
    username:String,
    firstname:String,
    lastname:String,
    password:String,
    cellphone:String|null,
    rol:userRoles,
    position:userPositions,
    document:Number,
    email:String|null,
    mailBox:Array<messagesDbInterface>,
    contacts:Array<userDbInterface>
}

export interface messagesDbInterface {
    "from":String,
    "to":String,
    "tittle":String,
    "body":String,
    "importance":importanceTypes,
    "read"?:Boolean,
    "deleted":Boolean
}