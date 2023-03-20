import { compareSync } from "bcrypt";
import { body } from "express-validator"
import { User } from "../database/models/User"
const letters = "abcdefghijklmnñopqrstuvwxyz"
const nums = "0123456789"
export const loginChainVal = [
    body("username")
        .notEmpty({ "ignore_whitespace": true }).withMessage("el campo 'username' no puede estar vacio").bail()
        .custom(async (value, { req }) => {
            const user = (await User.findOne({ username: value }).select({contacts:0, mailBox:0, cellphone:0, email:0, document:0}))
            if (!user) throw new Error("Usuario inexistente");
            req.body.user = user
            return true
        }),
    body("password")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'password' no puede estar vacio").bail()
        .custom(async (value, { req }) => {
            if(req.body.user === undefined) return true
            if(compareSync(value, req.body.user.password)){
                const userId = req.body.user._id
                req.body.user = req.body.user.toObject()
                req.body.user.userId = userId
                delete req.body.user.cellphone
                return true
            }
            throw new Error("Contraseña incorrecta");
            
        })
]

export const registerChainVal = [
    body("username")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'username' no puede estar vacio").bail()
        .isLength({ min: 2, max: 12 }).withMessage("El 'usename' no puede ser mayor a 12 caracteres y menor a 2").bail()
        .custom(async (value) => {
            if (await User.findOne({ username: value }) !== null) throw new Error("nombre de usuario ocupado");
            return true
        }),
    body("password")
        .notEmpty({ "ignore_whitespace": true }).withMessage("El campo 'password' no puede estar vacio").bail()
        .isLength({ min: 8, max: 12 }).withMessage("El 'password' no puede ser mayor a 12 y menor a 8").bail()
        .custom((value: string) => {
            let uper = false
            let lower = false
            let num = false

            value.split("").some(letter => letters.includes(letter)) ? lower = true : null
            value.split("").some(letter => letters.toUpperCase().includes(letter)) ? uper = true : null
            value.split("").some(letter => nums.includes(letter)) ? num = true : null

            if (!uper || !lower || !num) throw new Error("'password' debe contener al menos una letra mayuscula, minuscula y un numero");
            return true
        }),
    body("position")
        .notEmpty({ ignore_whitespace: true }).withMessage("El campo 'position' no puede estar vacio").bail()
        .isIn(["FUNCIONARIO", "GERENTE", "JEFE", "DIRECTOR"]).withMessage("El campo 'position' solo espera los valores : 'FUNCIONARIO', 'GERENTE', 'JEFE', 'DIRECTOR'"),
    body("document")
        .notEmpty({"ignore_whitespace":true}).withMessage("El campo 'document' no puede estar vacio").bail()
        .custom(async(value)=>{
            if(isNaN(parseInt(value)))throw new Error("El campo 'document' debe ser un numero entero sin puntos ni comas");
            if(!(value.length >= 7 && value.length <= 9)) throw new Error("El campo 'document' debe contener un dni valido");
            if(await User.findOne({document:value}) !== null) throw new Error(`El documento ${value} ya esta registrado`);
            return true
        }),
    body("firstname")
        .notEmpty({ignore_whitespace:true}).withMessage("El campo 'firstname' no puede estar vacio"),
    body("lastname")
        .notEmpty({ignore_whitespace:true}).withMessage("El campo 'lastname' no puede estar vacio"),
    body("email").optional()
        .isEmail().withMessage("El campo 'email' debe contener un correo valido")
]