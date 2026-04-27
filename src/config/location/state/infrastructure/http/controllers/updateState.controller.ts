import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { IUpdateStatePort } from '../../../application/ports/iUpdateState.port';
import { StateRequestDto } from '../../../application/dtos/requests/state.request.dto';

export class UpdateStateController {

    constructor (private readonly updateStatePort: IUpdateStatePort) {}

    updateState = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateStatePort.execute(req.params.id as string, req.body as StateRequestDto),
                'Estado actualizado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}