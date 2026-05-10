import { HttpStatus } from '../../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../../core/domain/exceptions/app.exception';

export class VehiclePlateAlreadyExistsException extends AppException {
  constructor(plate: string) {
    super(`Vehicle with plate ${plate} already exists`, HttpStatus.CONFLICT);
  }
}