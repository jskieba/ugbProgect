import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import { Ugb } from "../database/models/Ugb";
import {Product} from "../database/models/Product";
import { Schema } from "mongoose";

//ONLY PRODUCTS




//PRODUCTS IN UGB
export const ugbProductList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const ugbId = req.params.ugbId
        const products:any = (await Ugb.findOne({_id:ugbId}).populate({path:"products.product",model:Product}))!.products
        return endpointResponse({res, code:200, message:"¡ Lista de productos !", body:{products, count:products.length}})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving Ugb Product List] - [ ugb/<ugbId>/product GET ]: ${error}`
        )
        return next(httpError)
    }
})

export const ugbProductDetail = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const productId = req.params.productId

        const product = (await Ugb.findById(ugbId,{products:{$elemMatch:{product:new Schema.Types.ObjectId(productId)}}}).populate("products.product"))?.products[0]
        return endpointResponse({res, code:200, message:"¡ Detalle de producto !", body:{product}})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - [ ]: ${error.message}`
        )
        return next(httpError)
    }
})

export const ugbProductAdd = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const productId = req.body.productId
        const productName = req.body.productName

        const product = (await Product.findOne({$or:[{_id:productId},{name:productName}]}))!

        const newProduct = {
            product:product._id,
            completed:0,
            periodicity:req.body.periodicity,
            month:req.body.month
        }
        await Ugb.findByIdAndUpdate(ugbId,{$push:{products:newProduct}})

        return endpointResponse({res, code:200, message:"¡ Producto añadido !", body:product})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving add product to ugb] - [ugb/<ugbId>/product POST]: ${error}`
        )
        return next(httpError)
    }
})

export const ugbProductUpdate = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const productId = req.body.productId

        const updateProduct = {
            "products.$.period":req.body.period,
            "products.$.month":req.body.month,
            "products.$.completed":req.body.completed
        }
        await Ugb.findOne({_id:ugbId, "products.product": productId},updateProduct)
        return endpointResponse({res, code:200, message:"¡Producto Actualizado!"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - [ ]: ${error.message}`
        )
        return next(httpError)
    }
})

export const ugbProductDelete = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const productId = req.params.productId

        await Ugb.findByIdAndUpdate(ugbId,{$pull:{"products":{"product":new Schema.Types.ObjectId(productId)}}})
        return endpointResponse({res, code:200, message:"¡ Producto removido de la ugb !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - [ ]: ${error.message}`
        )
        return next(httpError)
    }
})