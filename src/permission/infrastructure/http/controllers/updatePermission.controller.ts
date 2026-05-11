import { Request, Response, NextFunction } from 'express';
import { IUpdatePermissionPort } from "../../../application/ports/iUpdatePermission.port";
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { UpdatePermissionInputDto } from '../../../application/dtos/requests/updatePermission.requet.dto';

export class UpdatePermissionController {

    constructor (private readonly updatePermissionPort: IUpdatePermissionPort) {}

    update = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updatePermissionPort.execute(req.params.id as string, req.body as UpdatePermissionInputDto),
                'Permiso actualizado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}