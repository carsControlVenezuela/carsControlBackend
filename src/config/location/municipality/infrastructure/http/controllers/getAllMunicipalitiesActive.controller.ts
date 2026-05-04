import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetAllActiveMunicipalitiesPort } from '../../../application/ports/iGetAllActiveMunicipalities.port';

export class GetAllMunicipalitiesActiveController  {
    
    constructor(private readonly getAllMunicipalitiesActivePort: IGetAllActiveMunicipalitiesPort) {}

    getAllMunicipalitiesActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getAllMunicipalitiesActivePort.execute(),
                'Municipios activos obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}