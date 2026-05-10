import { HttpStatus } from '../../../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../../../core/domain/exceptions/app.exception';

export class BrandNotFoundException extends AppException {
  constructor(id: string) {
    super(`Brand with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
