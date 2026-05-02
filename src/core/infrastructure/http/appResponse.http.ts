import { Response } from 'express';
import { HttpStatus } from '../../domain/enums/httpStatus.enun';

export class AppResponse<T> {
  public readonly success: boolean;
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: T | null;
  public readonly timestamp: string;

  private constructor(success: boolean, statusCode: number, message: string, data: T | null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static ok<T>(res: Response, data: T, message = 'Operación exitosa'): void {
    const response = new AppResponse(true, HttpStatus.OK, message, data);
    res.status(HttpStatus.OK).json(response);
  }

  static created<T>(res: Response, data: T, message = 'Creado exitosamente'): void {
    const response = new AppResponse(true, HttpStatus.CREATED, message, data);
    res.status(HttpStatus.CREATED).json(response);
  }

  static error(res: Response, statusCode: number, message: string): void {
    const response = new AppResponse(false, statusCode, message, null);
    res.status(statusCode).json(response);
  }
}
