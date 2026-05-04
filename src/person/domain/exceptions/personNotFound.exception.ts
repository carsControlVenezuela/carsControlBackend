import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class PersonNotFoundException extends AppException {
    constructor(value: string) {
        super(`Persona con '${value}' no encontrada`, HttpStatus.NOT_FOUND);
    }
}