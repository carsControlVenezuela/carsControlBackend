import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetAllStatesByKeywordsPort } from '../../../application/ports/iGetAllStatesByKeywords.port';

export class GetAllStatesByKeywordsController {

    constructor(private readonly getAllStatesByKeywordsUseCase: IGetAllStatesByKeywordsPort) {}

    search = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.ok(
                res,
                await this.getAllStatesByKeywordsUseCase.execute(req.params.keyword as string),
                'Estados obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}