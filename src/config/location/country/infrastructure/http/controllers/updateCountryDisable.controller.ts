import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IUpdateCountryDisablePort } from "../../../application/ports/iUpdateCountryDisable.port";

export class UpdateCountryDisableController {

    constructor(private readonly updateCountryDisablePort: IUpdateCountryDisablePort) {}

    updateCountryDisable = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateCountryDisablePort.execute(req.params.id as string),
                'Estado deshabilitado del país actualizado exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }
}