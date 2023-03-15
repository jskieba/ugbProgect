import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors";
import { decodeToken } from "../helpers/tokenHelper";
import { endpointResponse } from "../helpers/succes";

export const checkToken = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const auth = req.headers["authorization"]
        if(!auth) return endpointResponse({res, code:402, message:"¡ No cuenta con un token !"})
        const token = await decodeToken(auth)
        if(!token) return endpointResponse({res, code:401, message:"¡ Token invalido o caducado !"})
        req.body.token = token
        next()
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving Token validation] - [ Token validation - GET]: ${error.message}`
        )
        return next(httpError)
    }
})