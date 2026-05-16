
import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class stateCreateWithIdCountryInvalidException extends AppException {
    constructor(idCountry: string) {
        super(`No se puede crear el state con el id de country ${idCountry}, ya que no esta registrado o no existe`, HttpStatus.BAD_REQUEST);
    }
}