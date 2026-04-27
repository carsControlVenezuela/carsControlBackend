import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetAllActiveStatesPort } from '../../../application/ports/iGetAllActiveStates.port';

export class GetAllStatesActiveController  {
    
    constructor(private readonly getAllStatesActivePort: IGetAllActiveStatesPort) {}

    getAllStatesActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getAllStatesActivePort.execute(),
                'Estados activos obtenidos exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}