import { Request, Response, NextFunction } from 'express';
import { IGetCountryByNamePort } from "../../../application/ports/iGetCountryByName.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class GetCountryByNameController {

    constructor(private readonly getCountryByNamePort: IGetCountryByNamePort) {}

    getCountryByName = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getCountryByNamePort.getCountryByName(req.params.name as string),
                'País obtenido exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}