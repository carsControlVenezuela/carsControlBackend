import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class MunicipalityAlreadyExistsException extends AppException {
    constructor(name: string) {
        super(`El municipio '${name}' ya existe`, HttpStatus.CONFLICT);
    }
}