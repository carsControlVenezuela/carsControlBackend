import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../core/infrastructure/http/appResponse.http";
import { ICreatePermissionPort } from "../../../application/ports/iCreatePermission.port";

export class CreatePermissionController {

    constructor(private readonly createPermissionPort: ICreatePermissionPort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

        try {
            AppResponse.created(
                res,
                await this.createPermissionPort.execute(req.body),
                'Permiso creado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}