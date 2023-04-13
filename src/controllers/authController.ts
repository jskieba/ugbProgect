import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { hashSync } from "bcrypt";
import { User } from "../database/models/User";
import { endpointResponse } from "../helpers/succes";
import { codeToken } from "../helpers/tokenHelper";

export const login = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { JWTSECRET } = process.env
        if(JWTSECRET === undefined) return endpointResponse({res, code:500, "message":"Error del servidor"})
        const token = await codeToken(req.body.user)
        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{token:"Bearer "+token}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving Login] - [ login - POST]: ${error.message}`
        )
        return next(httpError)
    }
})

export const register = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { SALTBCRYPT } = process.env
        if(SALTBCRYPT === undefined) return true
        const newUser = {
            "username":req.body.username,
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "password":hashSync(req.body.password,parseInt(SALTBCRYPT)),
            "position":req.body.position,
            "cellphone":req.body.cellphone,
            "document":parseInt(req.body.document)
        }
        await User.create(newUser)
        return endpointResponse({res, code:202, message:"Usuario creado"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving register] - [ Register - POST]: ${error.message}`
        )
        return next(httpError)
    }
})
