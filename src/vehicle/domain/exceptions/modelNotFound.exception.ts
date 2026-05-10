import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class ModelNotFoundException extends AppException {
  constructor(id: string) {
    super(`Model with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
