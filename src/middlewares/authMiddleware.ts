import { compareSync } from "bcrypt";
import {body} from "express-validator"
import { User } from "../database/models/User"
const letters = "abcdefghijklmnñopqrstuvwxyz"
const nums = "0123456789"
export const loginChainVal = [
    body("username")
        .notEmpty({"ignore_whitespace":true}).withMessage("el campo 'username' no puede estar vacio").bail()
        .custom(async(value,{req})=>{
            const user = await User.findOne({username:value})
            if(!user)throw new Error("Usuario inexistente");
            req.body.user=user
            return true
        }),
    body("password")
        .notEmpty({"ignore_whitespace":true}).withMessage("El campo 'password' no puede estar vacio").bail()
        .custom(async(value,{req})=>{
            if(req.body.user && !compareSync(value, req.body.user.password)) throw new Error("Contraseña incorrecta");
            return true
        })
]

export const registerChainVal = [
    body("username")
        .notEmpty({"ignore_whitespace":true}).withMessage("El campo 'username' no puede estar vacio").bail()
        .isLength({min:2, max:12}).withMessage("El 'usename' no puede ser mayor a 12 caracteres y menor a 2").bail()
        .custom(async(value)=>{
            if(await User.findOne({username:value}) !== null) throw new Error("nombre de usuario ocupado");
            return true
        }),
    body("password")
        .notEmpty({"ignore_whitespace":true}).withMessage("El campo 'password' no puede estar vacio").bail()
        .isLength({min:8, max:12}).withMessage("El 'password' no puede ser mayor a 12 y menor a 8").bail()
        .custom((value:string)=>{
            let uper = false
            let lower = false
            let num = false

            value.split("").some(letter=>letters.includes(letter))?lower=true:null
            value.split("").some(letter=>letters.toUpperCase().includes(letter))?uper=true:null
            value.split("").some(letter=>nums.includes(letter))?num=true:null

            if(!uper || !lower || !num) throw new Error("'password' debe contener al menos una letra mayuscula, minuscula y un numero");
            return true
        }),
    body("position")
        .notEmpty({ignore_whitespace:true}).withMessage("El campo 'position' no puede estar vacio")
]