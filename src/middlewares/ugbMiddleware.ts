import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";
import { isObjectIdOrHexString } from "mongoose";
import { Ugb } from "../database/models/Ugb";
import { User } from "../database/models/User";
import { endpointResponse } from "../helpers/succes";


export const ugbChain = [
    body("area")
        .notEmpty().withMessage("El campo 'area' no puede estar vacio"),
    body("manager")
        .notEmpty().withMessage("El campo 'manager' no puede estar vacio").bail()
        .custom(async(value)=>{
            const user = await User.findById(value)
            if(!user) throw new Error("El id de 'manager' no existe");
            return true
        })
]

export const queryChain = [
    query("limit").optional()
        .isInt({"min":1, "max":100}).withMessage("La query 'limit' debe ser un numero entero mayor a 0(cero) y menor a 100(cien)"),
    query("page").optional()
        .isInt({"min":0}).withMessage("La query 'page' debe ser un numero entero mayor a 0(cero)")
]


export const checkUgbId =async (req:Request, res:Response, next:NextFunction) => {
    const ugbId = req.params.ugbId
    if(isObjectIdOrHexString(ugbId)){
        if(await Ugb.findById(ugbId)){
            next()
        }else{
            return endpointResponse({res, code:200, message:"Ugb inexistente"})
        }
    }else{
        return endpointResponse({res, code:400, message:"id de Ugb invalido"})
    }
}

export const addMemberChain = [
    body("memberId")
        .notEmpty().withMessage("El campo 'memberId' no debe estar vacio").bail()
        .isHexadecimal().withMessage("Debe ser un mensaje exadecimal").bail()
        .isLength({"min":24, "max":24}).withMessage("Debe contener 24 caracteres"),
    body("leader")
        .notEmpty().withMessage("El campo 'leader' no puede estar vacio").bail()
        .isBoolean().withMessage("El campo 'leader' debe ser verdadero o falso")
]

export const deleteMemberChain = [
    body("memberId")
        .notEmpty().withMessage("El campo 'memberId' no debe estar vacio").bail()
        .isHexadecimal().withMessage("Debe ser un mensaje exadecimal").bail()
        .isLength({"min":24, "max":24}).withMessage("Debe contener 24 caracteres")
]