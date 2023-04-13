import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { Product } from "../database/models/Product";
import { endpointResponse } from "../helpers/succes";

export const checkitemId = async (req:Request, res:Response, next:NextFunction) => {
    const productId = req.params.productId
    const itemId = req.params.itemId
    if(isObjectIdOrHexString(itemId)){
        if(await Product.findById(productId,{controlItems:{$elemMatch:{_id:itemId}}})){
            next()
        }else{
            endpointResponse({res, code:200, message:"item inexistente"})
        }
    }else{
        endpointResponse({res, code:400, message:"id de item invalido"})
    }
}