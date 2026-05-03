import { Request, Response, NextFunction } from 'express';
import { ILoginPort } from '../../../application/ports/login.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class LoginController {

  constructor(private readonly loginUseCase: ILoginPort,) {}

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.loginUseCase.execute(req.body);
            AppResponse.ok(res, result, 'Login exitoso');
        } catch (error) {
            next(error);
        }
    };
}