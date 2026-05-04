import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class UserAlreadyExistsException extends AppException {
    constructor(email: string) {
        super(`El usuario con email '${email}' ya existe`, HttpStatus.CONFLICT);
    }
}