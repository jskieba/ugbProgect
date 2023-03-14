import { sign, verify } from "jsonwebtoken";
export const decodeToken =async (codedToken:string):Promise<Object | false> => {
    try {
        const {JWTSECRET} = process.env
        const bearer = codedToken.split(" ")[0]
        if(bearer.toLowerCase()!=="bearer") throw new Error
        if(!JWTSECRET) throw new Error
        const decodedtoken:Object = verify(codedToken.split(" ")[1],Buffer.from(JWTSECRET,"base64"))
        return decodedtoken
    } catch (error) {
        return false
    }
}

export const codeToken=async (objectToCode:Object):Promise<string|null> => {
    try {
        const {JWTSECRET} = process.env
        if(!JWTSECRET) throw new Error
        const token = sign(objectToCode,Buffer.from(JWTSECRET,"base64"),{"expiresIn":"1d"})
        return token
    } catch (error) {
        console.error(error)
        return null
    }
}