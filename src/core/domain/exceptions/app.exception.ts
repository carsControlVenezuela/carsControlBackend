import { HttpStatus } from "../enums/httpStatus.enun";

export class AppException extends Error {
  public readonly statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.name      = this.constructor.name;
    this.statusCode = statusCode;
  }
}