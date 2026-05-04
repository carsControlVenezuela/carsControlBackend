import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class InvalidCredentialsException extends AppException {
    constructor() {
        super('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
}