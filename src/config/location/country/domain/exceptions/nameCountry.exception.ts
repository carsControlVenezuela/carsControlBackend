import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class NameCountryException extends AppException {
  constructor() {
    super('El nombre del país es requerido', HttpStatus.BAD_REQUEST);
  }
}