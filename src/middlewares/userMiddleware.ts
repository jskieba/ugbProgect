import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import { userPositions, userRoles } from "../interfaces/interfaces";
import { body } from "express-validator";
import { User } from "../database/models/User";
import { compareSync } from "bcrypt";
import mongoose, { isObjectIdOrHexString } from "mongoose";
const letters = "abcdefghijklmnñopqrstuvwxyz"
const nums = "0123456789"

export const checkPosition = (position: Array<userPositions>) => {

    const response = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body.token
            if (!position.includes(user.position)) return endpointResponse({ res, code: 401, message: `Solo autorizado para : ${position.join(", ")}` })
            next()
        } catch (error: any) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving check position]: ${error.message}`
            )
            return next(httpError)
        }
    })


    return response
}


export const checkRol = (position: Array<userRoles>) => {

    const response = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body.token
            if (!position.includes(user.rol)) return endpointResponse({ res, code: 401, message: `Solo autorizado para : ${position.join(", ")}` })
            next()
        } catch (error: any) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving check Rol Middleware]: ${error.message}`
            )
            return next(httpError)
        }
    })


    return response
}

export const updateUserChain = [
    body("firstname").optional()
        .isLength({min:3, max:12}),
    body("lastname").optional()
        .isLength({min:3, max:12}),
    body("username").optional()
        .isLength({ min: 2, max: 12 }).withMessage("El 'usename' no puede ser mayor a 12 caracteres y menor a 2").bail()
        .custom(async (value, {req}) => {
            const userFound = await User.findOne({ username: value })
            if (userFound !== null && userFound._id.toString() !== req.body.token.userId) throw new Error("nombre de usuario ocupado");
            return true
        }),
    body("newPassword").optional()
    .isLength({ min: 8, max: 12 }).withMessage("El 'password' no puede ser mayor a 12 y menor a 8").bail()
    .custom(async(value: string, {req}) => {
        if(!req.body.oldPassword) throw new Error("Si desea cambiar la contraseña: el campo 'oldPassword' no puede estar vacio");
        
        if(!compareSync(req.body.oldPassword,(await User.findOne({_id:req.body.token.userId}))?.password || ""))throw new Error("la contraseña anterior no coincide");
        

        let uper = false
        let lower = false
        let num = false

        value.split("").some(letter => letters.includes(letter)) ? lower = true : null
        value.split("").some(letter => letters.toUpperCase().includes(letter)) ? uper = true : null
        value.split("").some(letter => nums.includes(letter)) ? num = true : null

        if (!uper || !lower || !num) throw new Error("'password' debe contener al menos una letra mayuscula, minuscula y un numero");
        return true
    }),
    body("email").optional()
        .isEmail().withMessage("El campo 'email' debe contener un correo valido")
]

export const addContactMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId
        const user = req.body.token
        if(!userId)return endpointResponse({res, code:400, message:"El campo 'userId' no debe estar vacio"})
        if(!isObjectIdOrHexString(userId))return endpointResponse({res, code:400, message:"El campo 'userId' debe ser un id de usuario valido"})
        if(!(await User.findById(userId)))return  endpointResponse({res, code:400, message:"No existe ese usuario"})
        if((await User.findOne({username:user.username}))!.contacts.includes(new mongoose.Types.ObjectId(userId)))return endpointResponse({res, code:400, message:"Este usuario ya esta entre sus contactos"})
        next()
    } catch (error: any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving check Rol Middleware]: ${error.message}`
        )
        return next(httpError)
    }
})