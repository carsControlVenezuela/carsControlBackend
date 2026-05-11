import { Request, Response, NextFunction } from "express";
import { IUpdateDisablePort } from "../../application/ports/iUpdateDisable.port";
import { AppResponse } from "../http/appResponse.http";

export class UpdateDisableController {

    constructor(private readonly updateDisableUseCase: IUpdateDisablePort){}

    updateDisable = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateDisableUseCase.execute(req.params.id as string),
                'Actualización exitosa'
            )
        } catch (error) {
            next(error);
        }
    }

}