import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { endpointResponse } from "../helpers/succes";

const validationHandlerMiddleware =async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return endpointResponse({res,"code":400,"status":false,"message":"Errores en la validacion",body:errors.mapped()})
    } else {
        return next()
    }
}

export default validationHandlerMiddleware