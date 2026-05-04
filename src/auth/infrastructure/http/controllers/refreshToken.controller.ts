import { Request, Response, NextFunction } from 'express';
import { IRefreshTokenPort } from '../../../application/ports/refreshToken.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class RefreshTokenController {

    constructor(private readonly refreshTokenUseCase: IRefreshTokenPort) {}

    refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { refreshToken } = req.body;
            const result = await this.refreshTokenUseCase.execute(refreshToken);
            AppResponse.ok(res, result, 'Token renovado exitosamente');
        } catch (error) {
            next(error);
        }
    };
}