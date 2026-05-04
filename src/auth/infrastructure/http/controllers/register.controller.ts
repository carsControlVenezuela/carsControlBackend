import { Request, Response, NextFunction } from 'express';
import { IRegisterPort } from '../../../application/ports/register.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
//import { HttpStatus } from '../../../../core/domain/enums/httpStatus.enun';

export class RegisterController {

    constructor(private readonly registerUseCase: IRegisterPort) {}

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.registerUseCase.execute(req.body);
            AppResponse.created(res, result, 'Usuario registrado exitosamente');
        } catch (error) {
            //AppResponse.error(res, HttpStatus.INTERNAL_SERVER_ERROR, (error as Error).message);
            next(error);
        }
    };
}