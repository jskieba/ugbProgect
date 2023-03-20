import { body, param, query } from "express-validator";
import { Ugb } from "../database/models/Ugb";
import { User } from "../database/models/User";


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

export const checkUgdId = [
    param("ugbId")
        .isHexadecimal().withMessage("Debe ser un mensaje exadecimal").bail()
        .isLength({"min":24, "max":24}).withMessage("Debe contener 24 caracteres").bail()
        .custom(async(value)=>{
            const ugb = await Ugb.findById(value)
            if(ugb === null) throw new Error("Ugb inexistente");
            return true
        })
]

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