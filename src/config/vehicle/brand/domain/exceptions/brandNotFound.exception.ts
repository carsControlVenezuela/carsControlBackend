import { HttpStatus } from '../../../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../../../core/domain/exceptions/app.exception';

export class BrandNotFoundException extends AppException {
  constructor(id: string) {
    super(`Brand with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class BrandAlreadyExistsException extends AppException {
  constructor(name: string) {
    super(`Brand with name ${name} already exists`, HttpStatus.CONFLICT);
  }
}
