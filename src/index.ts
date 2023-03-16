require("dotenv").config()
import { Core } from "./server";
import indexRouter from "./routes/index.routes"
import { endpointResponse } from "./helpers/succes";
import { Errback, NextFunction, Request, Response } from "express";

const core = Core.instance;

    (async () => {


        try {
            await core.start()
            //http handlers
            core.app.use(indexRouter)

            core.app.use((_req: Request, res: Response, _next: NextFunction) => {
                return endpointResponse({ res, code: 404, message: "URL invalida" })
            })

            core.app.use((err:Errback|any, _req: Request, res: Response, _next: NextFunction) => {

                console.error(err);
                if(err.status === 400 && err.type === "entity.parse.failed") return endpointResponse({res, code:400, message:"JSON invalido"})
                return endpointResponse({res, code:500, body:{ error: "Error interno del servidor." }})
            })

        } catch (err:any) {
            core.close(err)
        }


    })()