import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IUpdateStateDisablePort } from '../../../application/ports/iUpdateStateDisable.port';

export class UpdateStateDisableController {

    constructor(private readonly updateStateDisablePort: IUpdateStateDisablePort) {}

    updateStateDisable = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateStateDisablePort.execute(req.params.id as string),
                'Estado deshabilitado actualizado exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }
}