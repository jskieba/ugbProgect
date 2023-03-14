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

            core.app.use((err: Errback, _req: Request, res: Response, _next: NextFunction) => {
                console.error(err);
                return endpointResponse({res, code:500, body:{ error: "Error interno del servidor." }})
            })

        } catch (err:any) {
            core.close(err)
        }


    })()