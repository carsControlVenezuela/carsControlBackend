import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IUpdateParishDisablePort } from '../../../application/ports/iUpdateParishDisable.port';

export class UpdateParishDisableController {

    constructor(private readonly updateParishDisablePort: IUpdateParishDisablePort) {}

    updateParishDisable = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateParishDisablePort.execute(req.params.id as string),
                'Parroquia deshabilitada actualizada exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }
}