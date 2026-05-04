import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetAllParishesByKeywordsPort } from '../../../application/ports/iGetAllParishesByKeywords.port';

export class GetAllParishesByKeywordsController {

    constructor(private readonly getAllParishesByKeywordsUseCase: IGetAllParishesByKeywordsPort) {}

    search = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.ok(
                res,
                await this.getAllParishesByKeywordsUseCase.execute(req.params.keyword as string),
                'Parroquias obtenidas exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}