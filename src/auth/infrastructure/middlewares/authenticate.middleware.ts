import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../core/infrastructure/http/appResponse.http';
import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { JwtPayload, jwtService } from '../http/jwt/jwt.service';

// extiende Request para agregar el usuario autenticado
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            AppResponse.error(res, HttpStatus.UNAUTHORIZED, 'Token no proporcionado');
            return;
        }

        const token   = authHeader.split(' ')[1];
        const payload = jwtService.verifyAccessToken(token);
        req.user      = payload;

        next();
    } catch {
        AppResponse.error(res, HttpStatus.UNAUTHORIZED, 'Token inválido o expirado');
    }
};