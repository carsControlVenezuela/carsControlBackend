import { Request, Response, NextFunction } from 'express';
import { IGetAllVehiclesRepairByKeywordsPort } from '../../../application/ports/iGetAllVehiclesRepairByKeywords.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetAllVehiclesRepairByKeywordsController {

    constructor(private readonly getAllVehiclesRepairByKeywordsUseCase: IGetAllVehiclesRepairByKeywordsPort) {}

    search = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        
        try {
            AppResponse.ok(
                res,
                await this.getAllVehiclesRepairByKeywordsUseCase.execute(req.params.keyword as string),
                'Talleres obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}