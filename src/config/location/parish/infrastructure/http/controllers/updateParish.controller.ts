import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IUpdateParishPort } from '../../../application/ports/iUpdateParish.port';
import { ParishRequestDto } from '../../../application/dtos/requests/parish.request.dto';

export class UpdateParishController {

    constructor (private readonly updateParishPort: IUpdateParishPort) {}

    updateParish = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateParishPort.execute(req.params.id as string, req.body as ParishRequestDto),
                'Parroquia actualizada exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}