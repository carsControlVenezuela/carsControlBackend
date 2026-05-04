import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetAllActiveParishesPort } from '../../../application/ports/iGetAllActiveParishes.port';

export class GetAllParishesActiveController  {
    
    constructor(private readonly getAllParishesActivePort: IGetAllActiveParishesPort) {}

    getAllParishesActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getAllParishesActivePort.execute(),
                'Parroquias activas obtenidas exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}