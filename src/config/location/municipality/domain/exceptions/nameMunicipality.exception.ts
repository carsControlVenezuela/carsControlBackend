import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class NameMunicipalityException extends AppException {
    constructor() {
        super('El nombre del municipio es requerido', HttpStatus.BAD_REQUEST);
    }
}