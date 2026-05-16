
import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class StateUpdateWithIdCountryInvalidException extends AppException {
    constructor(idCountry: string) {
        super(`No se puede actualizar el state con el id de country ${idCountry}, ya que no esta registrado`, HttpStatus.BAD_REQUEST);
    }
}