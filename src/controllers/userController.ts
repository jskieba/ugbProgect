import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../helpers/catchAsync"
import { endpointResponse } from "../helpers/succes"
import createHttpError from "http-errors"
import { User } from "../database/models/User"

export const userList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const limit:any = req.query.limit
        const page:any = req.query.page

        const users = await User.find().limit(parseInt(limit)).skip(parseInt(page)).select({mailBox:0, contacts:0})
        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{users}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const selfInfoUser = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const updateUser = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const deleteUser = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const userDetail = catchAsync(async (_req:Request, res:Response, next:NextFunction) => {
    try {

        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:{}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})
