import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class PermissionNotFoundException extends AppException {
    constructor(value: string) {
        super(`'${value}' no encontrado`, HttpStatus.NOT_FOUND);
    }
}