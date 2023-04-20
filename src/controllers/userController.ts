import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../helpers/catchAsync"
import { endpointResponse } from "../helpers/succes"
import createHttpError from "http-errors"
import { User } from "../database/models/User"
import { cleanUserProfile } from "../helpers/helper"
import mongoose from "mongoose"
export const userList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const limit:any = req.query.limit || "10"
        const page:any = req.query.page || "0"

        const users = (await User.find({}).limit(parseInt(limit)).skip(parseInt(page)).select({mailBox:0, contacts:0}))
        .map(user=>{
            let cleanedUser:any = user.toJSON()
            cleanedUser = cleanUserProfile(cleanedUser)
            return {
                ...cleanedUser,
                userId:user._id.toString()
            }
        })
        return endpointResponse({res, code:200, message:"¡ Lista de usuarios !", body:{users, count:users.length}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User List] - [ user/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const funcionariosList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const limit:any = req.query.limit || "10"
        const page:any = req.query.page || "0"
        let query = {}
        if(req.query.withUgb === "true"){
            query={"FUNCIONARIO":{$exists:true}}
        }else if(req.query.withUgb === "false"){
            query={"FUNCIONARIO":{$exists:false}}
        }
        const users = (await User.find({position:"FUNCIONARIO", ...query}).limit(parseInt(limit)).skip(parseInt(page)).select({mailBox:0, contacts:0}))
        .map(user=>{
            let cleanedUser:any = user.toJSON()
            cleanedUser = cleanUserProfile(cleanedUser)
            return {
                ...cleanedUser,
                userId:user._id.toString()
            }
        })
        return endpointResponse({res, code:200, message:"¡ Lista de funcionarios !", body:{users, count:users.length}})
    } catch (error:any) {
        console.log(error)
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
        user = cleanUserProfile(user)
        const unreadMessages = findUser?.toObject().mailBox.reduce((count,mail)=>{
            mail.read?count++:null
            return count
        },0)
        return endpointResponse({res, code:200, message:"¡Mi informacion!", body:{userId, contactAmount:user.contacts.length, unreadMessages,...user}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User Info] - [ user - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const updateUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const username = req.params.username ||req.body.token.username
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

export const deleteUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const username = req.params.username
        const user = await User.findOne({username})

        return endpointResponse({res, code:200, message:"¡Usuario Eliminado con exito!", body:{user}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving Delete User] - [ user - DELETE]: ${error.message}`
        )
        return next(httpError)
    }
})

export const userDetail = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const username = req.params.username
        const user:any = await User.findOne({username}).select({mailBox:0, contacts:0})
        return endpointResponse({res, code:200, message:"¡ Detalle de Usuario!", body:{user:cleanUserProfile(user.toJSON())}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User Detail] - [ user/id - GET]: ${error.message}`
        )
        return next(httpError)
    }
})


export const contactList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        let user = req.body.token
        const myContacts:any = await User.findOne({username:user.username}).select({contacts:1}).populate({path:"contacts", select:{document:0, mailBox:0, contacts:0, cellphone:0, rol:0, FUNCIONARIO:0, JEFE:0, DIRECTOR:0, GERENTE:0}})
        const contacts:[any]= myContacts.contacts
        return endpointResponse({res, code:200, message:"¡ lista de contactos !", body:{contacts:contacts?.map((contact:any)=>{return {idUser:contact._id, ...cleanUserProfile(contact.toJSON())}})}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User Detail] - [ user/id - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const addContact = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.body.userId
        const user = req.body.token
        await User.findOneAndUpdate({username:user.username},{$push:{contacts:new mongoose.Types.ObjectId(userId)}})
        return endpointResponse({res, code:200, message:"¡ contacto añadido !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User Detail] - [ user/id - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const deleteContact = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        let user = req.body.token
        const userId = req.body.userId

        await User.findOneAndUpdate({username:user.username},{$pull:{contacts:userId}})
        return endpointResponse({res, code:200, message:"¡ contacto eliminado !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving User Detail] - [ user/id - GET]: ${error.message}`
        )
        return next(httpError)
    }
})