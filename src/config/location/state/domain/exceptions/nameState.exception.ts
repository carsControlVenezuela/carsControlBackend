import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class NameStateException extends AppException {
    constructor() {
        super('El nombre del estado es requerido', HttpStatus.BAD_REQUEST);
    }
}