import { body } from "express-validator";
import { isObjectIdOrHexString } from "mongoose";
import { Product } from "../database/models/Product";

export const addProdUgbChain = [
    body("productId")
        .custom((value,{req})=>{
            if(req.body.name && value) throw new Error("Solo puede añadir por ID o por nombre");
            if(value === undefined && req.body.name === undefined) throw new Error("Debe buscar una ugb por ID o nombre");
            return true
        }).bail()
        .custom(async(value)=>{
            if(!value)return true
            const product = await Product.findById(value)
            if(product === null) throw new Error("No existe una ugb con ese ID");
            if(!isObjectIdOrHexString(value)) throw new Error("Debe ser un hexadesimal con 24 caracteres");
            return true
        }),
    body("name")
        .custom((value,{req})=>{
            if(req.body.productId && value) throw new Error("Solo puede añadir por ID o por nombre");
            if(value === undefined && req.body.productId === undefined) throw new Error("Debe buscar una ugb por ID o nombre");
            return true
        }).bail()
        .custom(async(value)=>{
            if(!value)return true
            const product = await Product.findOne({name:value})
            if(product === null) throw new Error("No existe una ugb con ese nombre");
            return true
        }),
    body("periodicity")
        .notEmpty().withMessage("El campo 'periodicity' no puede estar vacio").bail()
        .custom(value=>{
            if(value != "SEMANAL" && value != "MENSUAL") throw new Error("El campo 'periodicity' debe contener el valor 'SEMANAL' o 'MENSUAL'");
            return true
        }),
    body("month")
        .notEmpty().withMessage("El campo 'month' no puede estar vacio")
    ]

export const updateUgbProductChain = [
    body("periodicity")
        .custom(value=>{
            if(value === undefined) return true
            if(value != "SEMANAL" && value != "MENSUAL") throw new Error("El campo 'periodicity' debe contener el valor 'SEMANAL' o 'MENSUAL'");
            return true
        })
]