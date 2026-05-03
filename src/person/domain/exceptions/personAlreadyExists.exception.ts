import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class PersonAlreadyExistsException extends AppException {
    constructor(cedula: string) {
        super(`Ya existe una persona con la cédula '${cedula}'`, HttpStatus.CONFLICT);
    }
}