import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IGetStateByNamePort } from '../../../application/ports/iGetStateByName.port';

export class GetStateByNameController {

    constructor(private readonly getStateByNamePort: IGetStateByNamePort) {}

    getStateByName = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.getStateByNamePort.execute(req.params.name as string),
                'Estado obtenido exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}