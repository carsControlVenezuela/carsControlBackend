import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class PermissionAlreadyExistsException extends AppException {
    constructor(resource: string, action: string) {
        super(`Ya existe un permiso para '${resource}:${action}'`, HttpStatus.CONFLICT);
    }
}