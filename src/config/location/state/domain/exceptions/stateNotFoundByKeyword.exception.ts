import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class StateNotFoundByKeywordException extends AppException {
    constructor() {
        super('No hay coincidencia la busqueda de estados', HttpStatus.NOT_FOUND);
    }
}