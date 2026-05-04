import { Request, Response, NextFunction } from 'express';
import { IGetCountryByIdPort } from "../../../application/ports/iGetCountryById.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class GetCountryByIdController {

    constructor(private readonly getCountryByIdPort: IGetCountryByIdPort) {}

    getCountryById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getCountryByIdPort.getCountryById(req.params.id as string),
                'País obtenido exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}