import { HttpStatus } from "../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../core/domain/exceptions/app.exception";

export class PersonsNotFoundByKeywordException extends AppException {
    constructor() {
        super('No hay coincidencia la busqueda de personas', HttpStatus.NOT_FOUND);
    }
}