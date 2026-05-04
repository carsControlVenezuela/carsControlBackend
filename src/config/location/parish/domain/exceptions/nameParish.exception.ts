import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class NameParishException extends AppException {
    constructor() {
        super('El nombre de la parroquia es requerido', HttpStatus.BAD_REQUEST);
    }
}