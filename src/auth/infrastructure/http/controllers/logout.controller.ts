import { Request, Response, NextFunction } from 'express';
import { ILogoutPort } from '../../../application/ports/logout.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class LogoutController {
    
    constructor(private readonly logoutUseCase: ILogoutPort) {}

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { refreshToken } = req.body;
            AppResponse.ok(res,await this.logoutUseCase.execute(refreshToken), 'Logout exitoso');
        } catch (error) {
            next(error);
        }
    };
}