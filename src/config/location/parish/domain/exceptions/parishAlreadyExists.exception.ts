import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class ParishAlreadyExistsException extends AppException {
    constructor(name: string) {
        super(`La parroquia '${name}' ya existe`, HttpStatus.CONFLICT);
    }
}