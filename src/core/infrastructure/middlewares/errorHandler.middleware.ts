/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../http/appResponse.http';
import { HttpStatus } from '../../domain/enums/httpStatus.enun';
import { AppException } from '../../domain/exceptions/app.exception';
import { AppLogger } from '../logger/winston.logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppException) {
    AppLogger.warn(err.message, {
        context:    'ExceptionHandler',
        statusCode: err.statusCode,
        name:       err.name
    });
    AppResponse.error(res, err.statusCode, err.message);
    return;
  }

  AppLogger.error(err.message, {
    context: 'ExceptionHandler',
    stack:   err.stack
  });

  AppResponse.error(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error interno del servidor');
};