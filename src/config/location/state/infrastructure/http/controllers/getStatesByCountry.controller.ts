import { Request, Response, NextFunction } from 'express';
import { IGetStatesByCountryPort } from "../../../application/ports/IGetStateByCountry.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class GetStatesByCountryController {

    constructor(private readonly getStatesByCountryPort: IGetStatesByCountryPort) {}

    getStatesByCountry = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        console.log('GetStatesByCountryController: ', req.params.country);
        try {
            AppResponse.ok(
                res,
                await this.getStatesByCountryPort.execute(req.params.country as string),
                'Estados obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }
}