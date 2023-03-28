import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import createHttpError from "http-errors"
import { endpointResponse } from "../helpers/succes";
import { Ugb } from "../database/models/Ugb";
import {Product} from "../database/models/Product";
import mongoose from "mongoose";

//ONLY PRODUCTS

export const productList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const limit:any = req.query.limit || "10"
        const page:any = req.query.page || "0"
        const count = await Product.count()
        const products = await Product.find().limit(parseInt(limit)).skip(parseInt(page)*parseInt(limit))
        return endpointResponse({res, code:200, message:"¡ Lista de productos !", body:{products, count}})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})

export const productDetail = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const productId = req.params.productId
        const product = await Product.findById(productId)
        return endpointResponse({res, code:200, message:"¡ Detalle del producto !", body:{product}})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})
export const createProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const newProduct = {
            "name":req.body.name,
            "requirements":parseInt(req.body.requirements),
            "controlItems":[]
        }
        await Product.create(newProduct)
        return endpointResponse({res, code:200, message:"¡ Producto Creado !"})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})
export const updateProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const productId = req.params.productId
        const updatedProduct = {
            "name":req.body.name,
            "requirements":parseInt(req.body.requirements)
        }
        await Product.findByIdAndUpdate(productId, updatedProduct)
        return endpointResponse({res, code:200, message:"¡ Producto actualizado !"})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})
export const deleteProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const productId = req.params.productId
        await Product.findByIdAndRemove(productId)
        return endpointResponse({res, code:200, message:"¡ Producto Eliminado !"})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - []: ${error}`
        )
        return next(httpError)
    }
})

//PRODUCTS IN UGB
export const ugbProductList = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {  
        const limit:any = req.query.limit||"10"
        const page:any = req.query.page||"0"
        const ugbId = req.params.ugbId
        const products:any = (await Ugb.findOne({_id:ugbId}).limit(parseInt(limit)).skip(parseInt(page)*parseInt(limit)).populate({path:"products.product",model:Product}))!.products
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

        const products:any = (await Ugb.findById(ugbId).populate("products.product"))!.products
        const product = products.find((prod:any)=>prod._id == productId)
        return endpointResponse({res, code:200, message:"¡ Detalle de producto !", body:{product}})
    } catch (error:any) {
        console.log(error)
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - [ ]: ${error}`
        )
        return next(httpError)
    }
})

export const ugbProductAdd = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const ugbId = req.params.ugbId
        const productId = req.body.productId
        const productName = req.body.name

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
        const productId = req.params.productId

        const updateProduct = {
            "products.$.period":req.body.period,
            "products.$.month":req.body.month,
            "products.$.completed":parseInt(req.body.completed)
        }
        await Ugb.findOneAndUpdate({_id:ugbId, "products._id": new mongoose.Types.ObjectId(productId)},updateProduct)
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

        await Ugb.findByIdAndUpdate(ugbId,{$pull:{"products":{"_id":new mongoose.Types.ObjectId(productId)}}})
        return endpointResponse({res, code:200, message:"¡ Producto removido de la ugb !"})
    } catch (error:any) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving ] - [ ]: ${error.message}`
        )
        return next(httpError)
    }
})