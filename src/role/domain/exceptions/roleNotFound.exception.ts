import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class RoleNotFoundException extends AppException {
    constructor(value: string) {
        super(`Rol '${value}' no encontrado`, HttpStatus.NOT_FOUND);
    }
}