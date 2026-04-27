import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class CountryNotFoundException extends AppException {
  constructor(value: string) {
    super(`El país con el valor '${value}' no existe`, HttpStatus.NOT_FOUND);
  }
}