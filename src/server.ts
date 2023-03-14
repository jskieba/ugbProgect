import express from "express"
import http from "http"
import https from "https"
import cors from "cors"
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs"
import path from "path"
import { dateNowTimestamp, dateZoneString } from "./helpers/helper"
import morgan from "morgan"
import { mongoosedb } from "./database/mongoDB"
export class Core {

    private http:http.Server|null
    private https:https.Server|null
    private static _instance : Core
    public static get instance() {return this._instance || (this._instance = new this())} 

    public app:express.Application

    constructor(){
        this.app=express()
        
        this.http = null
        this.https = null
    }

    public async start():Promise<void>{
        
        const { PORT, PROTOCOL, URLDB, JWTSECRET, SALTBCRYPT} = process.env
        if( !PORT || !PROTOCOL || !URLDB || !JWTSECRET || !SALTBCRYPT)throw new Error("Faltan Variables de entorno");
        if(PROTOCOL!=="HTTP" && PROTOCOL!=="HTTPS") throw new Error("Protocolo invalido ,'HTTP' o 'HTTPS' permitidos");
        if(isNaN(parseInt(SALTBCRYPT)))throw new Error("la variable de entorno 'SALTBCRYPT' debe ser un numero")
        if(PROTOCOL==="HTTP"){
            this.http = http.createServer(this.app).listen(PORT,()=>console.log(`=============== Servidor \x1b[32mHTTP escuchando\x1b[0m en puerto ${PORT} ===============`))
        }else{
            const key = readFileSync(path.join(__dirname,"./../cert/"))
            const cert = readFileSync(path.join(__dirname,"./../cert/"))
            this.https = https.createServer({key, cert},this.app).listen(PORT,()=>{console.log(`=============== Servidor \x1b[32mHTTPS escuchando\x1b[0m en puerto ${PORT} ===============`)})
        }

        this.app.set("ENV",{PORT,PROTOCOL,URLDB})
        this.app.use(cors())
        this.app.use(morgan("dev"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        await mongoosedb(URLDB)

    }

    public close(err?:Error):void{
        if(err){
            console.error("Sucedio un error con el servidor, ver en carpeta logs el error de manera mas detallada.")
            console.error(err.message)
            if(!existsSync(path.join(__dirname,"./../logs")))mkdirSync(path.join(__dirname,"./../logs"))
            appendFileSync(path.join(__dirname,"./../logs/serverErrors.txt"),`${dateZoneString(dateNowTimestamp(),'zu-ZA', 'America/Argentina/Cordoba')}\n${err.stack}\n`,{"encoding":"ascii"})
        }

        this.http?.close()
        this.https?.close()
    }
}