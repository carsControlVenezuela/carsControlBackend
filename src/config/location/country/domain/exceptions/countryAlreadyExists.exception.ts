import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class CountryAlreadyExistsException extends AppException {
  constructor(name: string) {
    super(`El país '${name}' ya existe`, HttpStatus.CONFLICT);
  }
}