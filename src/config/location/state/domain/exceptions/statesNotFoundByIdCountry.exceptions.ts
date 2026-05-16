import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class StatesNotFoundByIdCountryException extends AppException {
    constructor(idCountry: string) {
        super(`No hay ningun estado asociado a ese id de pais o se introdujo mal el id del pais: ${idCountry} `, HttpStatus.CONFLICT);
    }
}