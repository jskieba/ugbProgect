import { NextFunction, Request, Response } from "express"
import { Ugb } from "../../database/models/Ugb"
import { User } from "../../database/models/User"
import createHttpError from "http-errors"
import { catchAsync } from "../../helpers/catchAsync"
import { endpointResponse } from "../../helpers/succes"
import { cleanUserProfile } from "../../helpers/helper"


export const allDataUgbsDirector = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.body.token.userId
        const memberSelect = {
            "username":1, 
            "firstname":1,
            "lastname":1,
            "rol":1,
            "position":1,
            "email":1
        }

        const allData:any = await User.findById(userId)
        .populate({
            "path":"DIRECTOR",
            "model":User,
            "select":memberSelect,
            populate:{
                "path":"GERENTE",
                "model":User, 
                select:memberSelect, 
                populate:{
                    "path":"JEFE",
                    "model":Ugb,
                    select:memberSelect,
                    populate:[
                        {"path":"members.user", model:User, select:memberSelect},
                        {"path":"boss", model:User, select:memberSelect}
                    ]
                }
            }
        })
        return endpointResponse({res, code:200, message:"¡Lista de UGBS a cargo!", body:cleanUserProfile(allData.toJSON())})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - [  - GET]: ${error.message}`
        )
        return next(httpError)
    }})

    export const allDataBossDirector = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
        try {
            const userId = req.body.token.userId
            const memberSelect = {
                "username":1, 
                "firstname":1,
                "lastname":1,
                "rol":1,
                "position":1,
                "email":1
            }
    
            const allData:any = await User.findById(userId)
            .populate({
                "path":"DIRECTOR",
                "model":User,
                "select":memberSelect,
                populate:{
                    "path":"GERENTE",
                    "model":User, 
                    select:memberSelect, 
                    populate:{
                        "path":"JEFE",
                        "model":Ugb
                    }
                }
            })
            return endpointResponse({res, code:200, message:"¡Lista de UGBS a cargo!", body:cleanUserProfile(allData.toJSON())})
        } catch (error:any) {
            console.log(error)
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving ] - [  - GET]: ${error.message}`
            )
            return next(httpError)
        }})

        export const allDataManagerDirector = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
            try {
                const userId = req.body.token.userId
                const memberSelect = {
                    "username":1, 
                    "firstname":1,
                    "lastname":1,
                    "rol":1,
                    "position":1,
                    "email":1
                }
        
                const allData:any = await User.findById(userId)
                .populate({
                    "path":"DIRECTOR",
                    "model":User,
                    "select":memberSelect,
                    populate:{
                        "path":"GERENTE",
                        "model":User, 
                        select:{"JEFE":1,...memberSelect}
                    }
                })
                return endpointResponse({res, code:200, message:"¡Lista de UGBS a cargo!", body:cleanUserProfile(allData.toJSON())})
            } catch (error:any) {
                console.log(error)
                const httpError = createHttpError(
                    error.statusCode,
                    `[Error retrieving ] - [  - GET]: ${error.message}`
                )
                return next(httpError)
            }})