import { Request, Response, NextFunction } from 'express';
import { IGetAllActiveCountriesPort } from "../../../application/ports/iGetAllActiveCountries.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class GetAllCountriesActiveController  {
    
    constructor(private readonly getAllCountriesActivePort: IGetAllActiveCountriesPort) {}

    getAllCountriesActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getAllCountriesActivePort.execute(),
                'Países activos obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}