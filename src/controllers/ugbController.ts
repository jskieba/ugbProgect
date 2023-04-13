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

        const memberSelect = {
            "username":1, 
            "firstname":1,
            "lastname":1,
            "rol":1,
            "position":1,
            "email":1
        }

        const ugbs = await Ugb.find().limit(parseInt(limit)).skip(parseInt(page)).populate("members.user",memberSelect)
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
        const ugb = await Ugb.findById(ugbDetail).populate("members.user",memberSelect).populate("boss",memberSelect)
        return endpointResponse({res, code:200, message:"¡Detalle de Ugb!", body:ugb})
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
            "boss":new mongoose.Types.ObjectId(req.body.boss)
        }
        let ugb = (await Ugb.findById(ugbId))!
        if(ugbUpdated.boss){
            await User.findByIdAndUpdate(ugb.boss,{$pull:{JEFE:ugbId}})
            await User.findByIdAndUpdate(ugb.boss,{$push:{JEFE:ugbId}})
        }
        const ugbUpdatedDb = await ugb.updateOne(ugbUpdated)
        return endpointResponse({res, code:200, message:"¡UGB actualizada!", body:ugbUpdatedDb})
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
            "boss":new mongoose.Types.ObjectId(req.body.manager)
        }
        const ugb = await Ugb.create(ugbCreated)
        await User.findByIdAndUpdate(req.body.manager,{"$push":{"JEFE":ugb._id}})
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
        const ugb = (await Ugb.findById(ugbId))!
        const members = ugb.members
        await User.updateMany(
            {_id:{$in:members}},
            {$set:{FUNCIONARIO:null}}
            )
        await User.findByIdAndUpdate(ugb.boss,{"$pull":{"JEFE":ugbId}})

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
        if(!user || user.FUNCIONARIO ) return endpointResponse({res, code:400, message:"¡ El miembro que quiere añadir ya esta asignado a otra ugb !"})

        await ugb.updateOne({"$push":{"members":{user:new mongoose.Types.ObjectId(memberId), leader}}})
        await user.updateOne({FUNCIONARIO:new mongoose.Types.ObjectId(ugbId)})
        return endpointResponse({res, code:201, message:"¡ miembro añadido a UGB !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ADD Member]: ${error.message}`
        )
        return next(httpError)
    }
})

export const deleteMember = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const memberId:string = req.body.memberId
        const user = await User.findById(memberId)
        if(user && user.FUNCIONARIO && user.FUNCIONARIO.toString() === ugbId) await user.updateOne({FUNCIONARIO:null})
        await Ugb.findByIdAndUpdate(ugbId,{"$pull":{"members":{"user":new mongoose.Types.ObjectId(memberId)}}})
        return endpointResponse({res, code:200, message:"¡ Miembro eliminado !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving Member DELETE]: ${error.message}`
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
            `[Error retrieving Update Member]: ${error.message}`
        )
        return next(httpError)
    }
})