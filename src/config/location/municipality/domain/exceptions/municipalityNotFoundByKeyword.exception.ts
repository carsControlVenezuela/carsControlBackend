import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class MunicipalityNotFoundByKeywordException extends AppException {
    constructor() {
        super('No hay coincidencia la busqueda de municipios', HttpStatus.NOT_FOUND);
    }
}