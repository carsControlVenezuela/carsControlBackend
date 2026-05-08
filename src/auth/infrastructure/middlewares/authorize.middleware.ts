import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../../../core/infrastructure/http/appResponse.http';
import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';

//Verifica que el usuario tenga al menos uno de los roles requeridos
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {

        if (!req.user) {
            AppResponse.error(res, HttpStatus.UNAUTHORIZED, 'No autenticado');
            return;
        }

        const hasRole = roles.some(role => req.user!.roles.includes(role));

        if (!hasRole) {
            AppResponse.error(res, HttpStatus.FORBIDDEN, 'No tienes permisos para esta acción');
            return;
        }

        next();
        
    };
};

//Verifica que el usuario tenga el permiso específico (resource:action)
export const authorizePermission = (resource: string, action: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {

        if (!req.user) {
            AppResponse.error(res, HttpStatus.UNAUTHORIZED, 'No autenticado');
            return;
        }

        const permission  = `${resource}:${action}`;
        const hasPermission = req.user.permissions.includes(permission);

        if (!hasPermission) {
            AppResponse.error(res, HttpStatus.FORBIDDEN, 'No tienes el permiso requerido');
            return;
        }

        next();

    };
};