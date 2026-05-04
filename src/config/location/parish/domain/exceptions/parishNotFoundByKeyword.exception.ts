import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class ParishNotFoundByKeywordException extends AppException {
    constructor() {
        super('No hay coincidencia en la busqueda de parroquias', HttpStatus.NOT_FOUND);
    }
}