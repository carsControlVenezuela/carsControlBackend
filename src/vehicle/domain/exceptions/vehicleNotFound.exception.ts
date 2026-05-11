import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class VehicleNotFoundException extends AppException {
  constructor(id: string) {
    super(`Vehicle with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class VehiclePlateAlreadyExistsException extends AppException {
  constructor(plate: string) {
    super(`Vehicle with plate ${plate} already exists`, HttpStatus.CONFLICT);
  }
}
