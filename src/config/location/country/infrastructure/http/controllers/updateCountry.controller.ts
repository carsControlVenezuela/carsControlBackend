import { Request, Response, NextFunction } from 'express';
import { IUpdateCountryPort } from "../../../application/ports/iUpdateCountry.port";
import { CountryRequestDto } from '../../../application/dtos/request/country.request.dto';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class UpdateCountryController {

    constructor (private readonly updateCountryPort: IUpdateCountryPort) {}

    updateCountry = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateCountryPort.execute(req.params.id as string, req.body as CountryRequestDto),
                'País actualizado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}