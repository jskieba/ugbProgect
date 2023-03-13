import { sign, verify } from "jsonwebtoken";
import { Core } from "../server";
export const decodeToken =async (codedToken:string):Promise<Object | false> => {
    try {
        const {JWTSECRET} = Core.instance.server.app.get("ENV")
        const bearer = codedToken.split(" ")[0]
        if(bearer.toLowerCase()!=="bearer") throw new Error
        const decodedtoken:Object = verify(codedToken.split(" ")[1],JWTSECRET)
        console.log(decodedtoken)
        return decodedtoken
    } catch (error) {
        return false
    }
}

export const codeToken=async (objectToCode:Object):Promise<string|null> => {
    try {
        const {JWTSECRET} = Core.instance.server.app.get("ENV")
        const token = sign(objectToCode,JWTSECRET,{"expiresIn":"1d"})

        return token
    } catch (error) {
        console.error(error)
        return null
    }
}