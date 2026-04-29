import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetAllMunicipalitiesByKeywordsPort } from '../../../application/ports/iGetAllMunicipalitiesByKeywords.port';

export class GetAllMunicipalitiesByKeywordsController {

    constructor(private readonly getAllMunicipalitiesByKeywordsUseCase: IGetAllMunicipalitiesByKeywordsPort) {}

    search = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.ok(
                res,
                await this.getAllMunicipalitiesByKeywordsUseCase.execute(req.params.keyword as string),
                'Municipios obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}