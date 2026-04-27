import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class StateAlreadyExistsException extends AppException {
    constructor(name: string) {
        super(`El estado '${name}' ya existe`, HttpStatus.CONFLICT);
    }
}