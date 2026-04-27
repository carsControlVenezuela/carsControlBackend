import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetStateByIdPort } from '../../../application/ports/iGetStateById.port';

export class GetStateByIdController {

    constructor(private readonly getStateByIdPort: IGetStateByIdPort) {}

    getStateById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getStateByIdPort.execute(req.params.id as string),
                'Estado obtenido exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}