import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IUpdateMunicipalityDisablePort } from '../../../application/ports/iUpdateMunicipalityDisable.port';

export class UpdateMunicipalityDisableController {

    constructor(private readonly updateMunicipalityDisablePort: IUpdateMunicipalityDisablePort) {}

    updateMunicipalityDisable = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateMunicipalityDisablePort.execute(req.params.id as string),
                'Municipio deshabilitado actualizado exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }
}