import { Request, Response, NextFunction } from 'express';
import { IGetAllPersonsByKeywordsPort } from '../../../application/ports/iGetAllPersonsByKeywords.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetAllPersonsByKeywordsController {

    constructor(private readonly getAllPersonsByKeywordsUseCase: IGetAllPersonsByKeywordsPort) {}

    search = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.ok(
                res,
                await this.getAllPersonsByKeywordsUseCase.execute(req.params.keyword as string),
                'Personas obtenidas exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}