import { Request, Response, NextFunction } from "express";
import { IUpdateActivePort } from "../../application/ports/iUpdateActive.port";
import { AppResponse } from "../http/appResponse.http";

export class UpdateActiveController {

    constructor(private readonly updateActiveUseCase: IUpdateActivePort){}

    updateActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            console.log("Entro en el controllador")
            AppResponse.ok(
                res,
                await this.updateActiveUseCase.execute(req.params.id as string),
                'Actualización exitosa'
            )
        } catch (error) {
            next(error);
        }
    }

}