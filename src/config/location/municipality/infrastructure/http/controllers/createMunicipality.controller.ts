import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { ICreateMunicipalityPort } from '../../../application/ports/iCreateMunicipality.port';


export class CreateMunicipalityController {

    constructor(private readonly createMunicipalityUseCase: ICreateMunicipalityPort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

        try {
            AppResponse.created(
                res,
                await this.createMunicipalityUseCase.execute(req.body),
                'Municipio creado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}