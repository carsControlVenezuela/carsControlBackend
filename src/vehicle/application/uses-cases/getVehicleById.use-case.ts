import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IVehicleRepository } from '../../domain/repositories/iVehicle.repository';
import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';
import { findVehicleOrFail } from '../helpers/findVehicleOrFail.helper';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { IGetVehicleByIdPort } from '../ports/iGetVehicleById.port';

export class GetVehicleByIdUseCase implements IGetVehicleByIdPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<VehicleResponseDto> {
    this.logger.info(`Getting vehicle with ID: ${id}`, { context: 'GetVehicleByIdUseCase' });

    const vehicle = await findVehicleOrFail(this.vehicleRepository, id);

    this.logger.info(`Vehicle found: ${vehicle.plate} (ID: ${vehicle.id})`, {
      context: 'GetVehicleByIdUseCase',
    });

    return VehicleMapper.toResponse(vehicle);
  }
}
