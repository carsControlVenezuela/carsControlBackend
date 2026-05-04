import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class InvalidTokenException extends AppException {
    constructor() {
        super('Token inválido o expirado', HttpStatus.UNAUTHORIZED);
    }
}