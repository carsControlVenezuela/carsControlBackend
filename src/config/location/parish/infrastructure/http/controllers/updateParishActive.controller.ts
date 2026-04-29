import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IUpdateParishActivePort } from '../../../application/ports/iUpdateParishActive.port';

export class UpdateParishActiveController  {

    constructor(private readonly updateParishActivePort: IUpdateParishActivePort) {}

    updateParishActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateParishActivePort.execute(req.params.id as string),
                'Parroquia actualizada exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}