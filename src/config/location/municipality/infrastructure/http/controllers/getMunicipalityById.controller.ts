import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetMunicipalityByIdPort } from '../../../application/ports/iGetMunicipalityById.port';

export class GetMunicipalityByIdController {

    constructor(private readonly getMunicipalityByIdPort: IGetMunicipalityByIdPort) {}

    getMunicipalityById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getMunicipalityByIdPort.execute(req.params.id as string),
                'Municipio obtenido exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}