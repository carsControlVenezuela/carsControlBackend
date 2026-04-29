import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IUpdateMunicipalityActivePort } from '../../../application/ports/iUpdateMunicipalityActive.port';

export class UpdateMunicipalityActiveController  {

    constructor(private readonly updateMunicipalityActivePort: IUpdateMunicipalityActivePort) {}

    updateMunicipalityActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateMunicipalityActivePort.execute(req.params.id as string),
                'Municipio actualizado exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}