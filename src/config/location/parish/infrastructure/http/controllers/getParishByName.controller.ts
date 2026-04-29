import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetParishByNamePort } from '../../../application/ports/iGetParishByName.port';

export class GetParishByNameController {

    constructor(private readonly getParishByNamePort: IGetParishByNamePort) {}

    getParishByName = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getParishByNamePort.execute(req.params.name as string),
                'Parroquia obtenida exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}