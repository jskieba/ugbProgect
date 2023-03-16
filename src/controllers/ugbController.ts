import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import { Ugb } from "../database/models/Ugb";
import mongoose from "mongoose"
import { User } from "../database/models/User";

export const ugbList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const limit:any = req.query.limit||"10"
        const page:any = req.query.page||"0"

        const ugbs = await Ugb.findOne().limit(parseInt(limit)).skip(parseInt(page))
        return endpointResponse({res, code:200, message:"¡Lista de UGBS!", body:ugbs})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const ugbDetail = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbDetail = req.params.ugbId
        const memberSelect = {
            "username":1, 
            "firstname":1,
            "lastname":1,
            "rol":1,
            "position":1,
            "email":1
        }
        const ugb = await Ugb.findById(ugbDetail).populate("members.user",memberSelect).populate("manager",memberSelect)
        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:ugb})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB DETAIL] : ${error.message}`
        )
        return next(httpError)
    }
})

export const updateUgb = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const ugbUpdated = {
            "area":req.body.area,
            "manager":new mongoose.Types.ObjectId(req.body.manager)
        }
        const ugb = await Ugb.findByIdAndUpdate(ugbId,ugbUpdated)
        return endpointResponse({res, code:200, message:"¡Usuario logueado!", body:ugb})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB LIST] - [ ugb/list - GET]: ${error.message}`
        )
        return next(httpError)
    }
})

export const createUgb = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbCreated={
            "area":req.body.area,
            "manager":new mongoose.Types.ObjectId(req.body.manager)
        }
        const ugb = await Ugb.create(ugbCreated)
        return endpointResponse({res, code:201, message:"¡ UGB Creada !", body:ugb})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB Create] - [ ugb/ - POST]: ${error.message}`
        )
        return next(httpError)
    }
})

export const deleteUgb = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        await Ugb.findByIdAndDelete(ugbId)
        return endpointResponse({res, code:200, message:"¡ UGB Eliminada !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB DELETE]: ${error.message}`
        )
        return next(httpError)
    }
})

//MEMBERS

export const membersList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const memberSelect = {
            "username":1, 
            "firstname":1,
            "lastname":1,
            "rol":1,
            "position":1,
            "email":1
        }
        const ugb = (await Ugb.findById(ugbId).populate("members.user",memberSelect))!
        const members = ugb.members
        return endpointResponse({res, code:200, message:"¡ Miembros de Ugb !", body:members})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB DELETE]: ${error.message}`
        )
        return next(httpError)
    }
})

export const addMember = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const ugb:any = (await Ugb.findById(ugbId))!
        
        if(ugb.toObject().members.length > 10)return endpointResponse({res, code:400, message:"¡ No se pueden agregar mas de 10 miembros por ugb!"})

        const memberId:string = req.body.memberId
        const leader:boolean = req.body.leader
        const user = await User.findById(memberId)
        if(!user || user.ugb !== null) return endpointResponse({res, code:400, message:"¡ El miembro que quiere añadir ya esta asignado a otra ugb !"})

        await ugb.updateOne({"$push":{"members":{user:new mongoose.Types.ObjectId(memberId), leader}}})
        await user.updateOne({"ugb":new mongoose.Types.ObjectId(ugbId)})

        return endpointResponse({res, code:201, message:"¡ miembro añadido a UGB !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB DELETE]: ${error.message}`
        )
        return next(httpError)
    }
})

export const deleteMember = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const memberId:string = req.body.memberId
        const user = await User.findById(memberId)
        if(user && user.ugb !== null && user.ugb.toString() === ugbId) await user.updateOne({ugb:null})
        await Ugb.findByIdAndUpdate(ugbId,{"$pull":{"members":{"user":new mongoose.Types.ObjectId(memberId)}}})
        return endpointResponse({res, code:200, message:"¡ Miembro eliminado !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB DELETE]: ${error.message}`
        )
        return next(httpError)
    }
})

export const updateMember = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const memberId:string = req.body.memberId
        const leader:boolean = req.body.leader

        const ugb = await Ugb.findOne({_id:new mongoose.Types.ObjectId(ugbId), "members.user":new mongoose.Types.ObjectId(memberId)})
        if(!ugb) return endpointResponse({res, code:400, message:"¡ No se encontro ese usuario dentro de la ugb!"})
        await Ugb.findOneAndUpdate({_id:new mongoose.Types.ObjectId(ugbId), "members.user":new mongoose.Types.ObjectId(memberId)},{
            "members.$.leader":leader
        })
        return endpointResponse({res, code:201, message:"¡ Miembro actualizado !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving UGB DELETE]: ${error.message}`
        )
        return next(httpError)
    }
})