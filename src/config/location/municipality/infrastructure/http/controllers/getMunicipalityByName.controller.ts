import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetMunicipalityByNamePort } from '../../../application/ports/iGetMunicipalityByName.port';

export class GetMunicipalityByNameController {

    constructor(private readonly getMunicipalityByNamePort: IGetMunicipalityByNamePort) {}

    getMunicipalityByName = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getMunicipalityByNamePort.execute(req.params.name as string),
                'Municipio obtenido exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}