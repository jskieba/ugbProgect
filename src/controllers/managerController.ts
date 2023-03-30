import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import { User } from "../database/models/User";

export const managerUgbList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = req.body.token
        const ugbs = (await User.findOne({username:user.username}).populate("GERENTE"))?.GERENTE
        return endpointResponse({res, code:200, message:"¡Lista de UGBS a cargo!", body:ugbs})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ manager/ugb - GET]: ${error.message}`
        )
        return next(httpError)
    }
})