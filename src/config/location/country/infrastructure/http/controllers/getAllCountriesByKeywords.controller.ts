import { Request, Response, NextFunction } from 'express';
import { IGetAllCountriesByKeywordsPort } from "../../../application/ports/iGetAllCountriesByKeywords.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class GetAllCountriesByKeywordsController {

    constructor(private readonly getAllCountriesByKeywordsUseCase: IGetAllCountriesByKeywordsPort) {}

    search = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.ok(
                res,
                await this.getAllCountriesByKeywordsUseCase.execute(req.params.keyword as string),
                'Países obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}