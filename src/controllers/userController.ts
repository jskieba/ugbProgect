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

export const selfInfoUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        let user = req.body.token
        const findUser = await User.findOne({username:user.username})
        const userId = findUser?._id.toString()
        user = findUser?.toJSON()
        const unreadMessages = findUser?.toObject().mailBox.reduce((count,mail)=>{
            mail.read?count++:null
            return count
        },0)
        return endpointResponse({res, code:200, message:"¡Mi informacion!", body:{userId, contactCount:user.contacts.length, unreadMessages,...user}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const updateUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const username = req.body.token.username
        const patchUser = {
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "username":req.body.username,
            "password":req.body.newPassword,
            "email":req.body.email,
            "cellphone":req.body.cellphone
        }

        const updatedUser = await User.findOneAndUpdate({username},patchUser,{"new":false, "runValidators":true})
        return endpointResponse({res, code:200, message:"¡Usuario actualizado!", body:{updatedUser}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User Update] - [ user - PATCH]: ${error.message}`
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
