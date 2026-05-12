import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IVehicleRepository } from '../../domain/repositories/iVehicle.repository';
import { IDeleteVehiclePort } from '../ports/iDeleteVehicle.port';

export class DeleteVehicleUseCase implements IDeleteVehiclePort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Deleting vehicle with ID: ${id}`, { context: 'DeleteVehicleUseCase' });
    await this.vehicleRepository.delete(id);
    this.logger.info('Vehicle deleted successfully', { context: 'DeleteVehicleUseCase' });
  }
}
