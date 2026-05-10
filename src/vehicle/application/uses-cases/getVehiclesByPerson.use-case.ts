import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IVehicleRepository } from '../../domain/repositories/iVehicle.repository';
import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { IGetVehiclesByPersonPort } from '../ports/iGetVehiclesByPerson.port';

export class GetVehiclesByPersonUseCase implements IGetVehiclesByPersonPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(idPerson: string): Promise<VehicleResponseDto[]> {
    this.logger.info(`Getting vehicles by person: ${idPerson}`, {
      context: 'GetVehiclesByPersonUseCase',
    });

    const vehicles = await this.vehicleRepository.findByPerson(idPerson);

    this.logger.info(`Found ${vehicles.length} vehicles`, {
      context: 'GetVehiclesByPersonUseCase',
    });

    return vehicles.map(VehicleMapper.toResponse);
  }
}
