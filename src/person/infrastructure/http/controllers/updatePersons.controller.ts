import { Request, Response, NextFunction } from 'express';
import { IUpdatePersonPort } from "../../../application/ports/iUpdatePerson.port";
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { UpdatePersonRequestDto } from '../../../application/dtos/requests/updatePerson.request.dto';

export class UpdatePersonController {

    constructor (private readonly updatePersonPort: IUpdatePersonPort) {}

    updatePerson = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updatePersonPort.execute(req.params.id as string, req.body as UpdatePersonRequestDto),
                'Persona actualizada exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}