import { Response } from "express"

interface endpointResponseMessage {
    res:Response,
    code?:number,
    status?:boolean,
    message?:string,
    body?:any,
    options?:any
}
export const endpointResponse = async(endpointResponseMessage:endpointResponseMessage) => {

    const res = endpointResponseMessage.res
    const status = endpointResponseMessage.status || true
    const message = endpointResponseMessage.message
    const code = endpointResponseMessage.code || 200
    const body = endpointResponseMessage.body
    const options = endpointResponseMessage.options

    res.status(code).json({
        status,
        code,
        message,
        body,
        options,
    })
}