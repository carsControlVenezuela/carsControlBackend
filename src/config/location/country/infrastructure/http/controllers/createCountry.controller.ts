import { Request, Response, NextFunction } from 'express';
import { ICreateCountryPort } from "../../../application/ports/iCreateCountry.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class CreateCountryController {

    constructor(private readonly createCountryUseCase: ICreateCountryPort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.created(
                res, 
                await this.createCountryUseCase.execute(req.body), 
                'País creado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }

}