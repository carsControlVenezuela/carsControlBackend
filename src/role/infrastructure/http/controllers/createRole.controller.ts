import { Request, Response, NextFunction } from 'express';
import { ICreateRolePort } from '../../../application/ports/iCreateRole.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class CreateRoleController {

    constructor(private readonly createRoleUseCase: ICreateRolePort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

        try {
            AppResponse.created(
                res,
                await this.createRoleUseCase.execute(req.body),
                'Rol creado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}