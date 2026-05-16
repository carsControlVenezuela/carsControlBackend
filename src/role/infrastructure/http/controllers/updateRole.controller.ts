import { Request, Response, NextFunction } from 'express';
import { IUpdateRolePort } from "../../../application/ports/iUpdateRole.port";
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { UpdateRoleInputDto } from '../../../application/dtos/requests/updateRole.request.dto';

export class UpdateRoleController {

    constructor (private readonly updateRolePort: IUpdateRolePort) {}

    update = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateRolePort.execute(req.params.id as string, req.body as UpdateRoleInputDto),
                'Rol actualizada exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}