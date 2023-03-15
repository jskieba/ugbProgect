import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import { Ugb } from "../database/models/Ugb";

export const ugbList = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {
        // const limit:any = req.query.limit
        // const page:any = req.query.page

        const ugbs = await Ugb.findOne().populate("manager.User")
        console.log(ugbs)
        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:ugbs})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const ugbDetail = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const updateUgb = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const createUgb = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const deleteUgb = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})