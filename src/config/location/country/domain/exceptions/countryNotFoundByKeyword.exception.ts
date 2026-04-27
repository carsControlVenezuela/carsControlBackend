import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class CountryNotFoundByKeywordException extends AppException {
  constructor() {
    super('No hay coincidencia la busqueda de paises', HttpStatus.NOT_FOUND);
  }
}