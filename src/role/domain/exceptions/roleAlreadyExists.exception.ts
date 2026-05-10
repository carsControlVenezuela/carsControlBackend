import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class RoleAlreadyExistsException extends AppException {
    constructor(name: string) {
        super(`Ya existe un rol con el nombre '${name}'`, HttpStatus.CONFLICT);
    }
}