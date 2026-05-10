import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IVehicleRepository } from '../../domain/repositories/iVehicle.repository';
import { UpdateVehicleRequestDto } from '../dtos/requests/updateVehicle.request.dto';
import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';
import { findVehicleOrFail } from '../helpers/findVehicleOrFail.helper';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { IUpdateVehiclePort } from '../ports/iUpdateVehicle.port';

export class UpdateVehicleUseCase implements IUpdateVehiclePort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string, request: UpdateVehicleRequestDto): Promise<VehicleResponseDto> {
    this.logger.info(`Updating vehicle with ID: ${id}`, { context: 'UpdateVehicleUseCase' });

    const existingVehicle = await findVehicleOrFail(this.vehicleRepository, id);
    const updated = VehicleMapper.merge(existingVehicle, request);
    await this.vehicleRepository.update(updated);

    this.logger.info(`Vehicle updated successfully: ${updated.plate} (ID: ${updated.id})`, {
      context: 'UpdateVehicleUseCase',
    });

    return VehicleMapper.toResponse(updated);
  }
}
