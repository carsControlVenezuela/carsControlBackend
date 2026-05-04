import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetParishByIdPort } from '../../../application/ports/iGetParishById.port';

export class GetParishByIdController {

    constructor(private readonly getParishByIdPort: IGetParishByIdPort) {}

    getParishById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getParishByIdPort.execute(req.params.id as string),
                'Parroquia obtenida exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}