import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IUpdateMunicipalityPort } from '../../../application/ports/iUpdateMunicipality.port';
import { MunicipalityRequestDto } from '../../../application/dtos/requests/municipality.request.dto';

export class UpdateMunicipalityController {

    constructor (private readonly updateMunicipalityPort: IUpdateMunicipalityPort) {}

    updateMunicipality = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateMunicipalityPort.execute(req.params.id as string, req.body as MunicipalityRequestDto),
                'Municipio actualizado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}