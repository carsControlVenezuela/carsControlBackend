import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IUpdateStateActivePort } from '../../../application/ports/iUpdateStateActive.port';

export class UpdateStateActiveController  {

    constructor(private readonly updateStateActivePort: IUpdateStateActivePort) {}

    updateStateActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateStateActivePort.execute(req.params.id as string),
                'Estado actualizado exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}