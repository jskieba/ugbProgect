import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import {Product} from "../database/models/Product";
import mongoose from "mongoose";

export const itemList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const productId = req.params.productId
        const product = (await Product.findById(productId))!
        const count = product.controlItems.length
        return endpointResponse({res, code:200, message:"¡ Lista de items !", body:{product:product.name, items:product.controlItems, count}})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})

export const itemDetail = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const productId = req.params.productId
        const itemId = req.params.itemId
        const item = (await Product.findById(productId,{controlItems:{$elemMatch:{_id:itemId}}, name:1}))!
        return endpointResponse({res, code:200, message:"¡ Detalle de item !", body:{item:item.controlItems[0], product:item.name}})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})

export const createItem = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const productId = req.params.productId
        const newItem = {
            title:req.body.title,
            description:req.body.description
        }
        await Product.findByIdAndUpdate(productId,{$push:{controlItems:newItem}})
        return endpointResponse({res, code:200, message:"¡ Item Creado !"})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})

export const updateItem = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const productId = req.params.productId
        const itemId = req.params.itemId
        const modifiedItem = {
            "controlItems.$.title":req.body.title,
            "controlItems.$.description":req.body.description
        }
        await Product.findOneAndUpdate({_id:productId, "controlItems._id":itemId},modifiedItem)
        return endpointResponse({res, code:200, message:"¡ Item actualizado !"})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})

export const deleteItem = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const productId = req.params.productId
        const itemId = req.params.itemId
        await Product.findByIdAndUpdate(productId,{$pull:{controlItems:{_id:new mongoose.Types.ObjectId(itemId)}}})
        return endpointResponse({res, code:200, message:"¡ Item eliminado !"})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})