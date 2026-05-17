import { HttpStatus } from '../../../core/domain/enums/httpStatus.enun';
import { AppException } from '../../../core/domain/exceptions/app.exception';

export class VehicleRepairAlreadyExistsException extends AppException {
  constructor(name: string) {
    super(`Ya existe un taller con el nombre '${name}'`, HttpStatus.CONFLICT);
  }
}