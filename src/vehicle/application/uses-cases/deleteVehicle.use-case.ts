import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IDeleteVehiclePort } from '../ports/iDeleteVehicle.port';

export class DeleteVehicleUseCase implements IDeleteVehiclePort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly executeFn: (id: string) => Promise<void>) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Deleting vehicle with ID: ${id}`, { context: 'DeleteVehicleUseCase' });
    await this.executeFn(id);
    this.logger.info('Vehicle deleted successfully', { context: 'DeleteVehicleUseCase' });
  }
}
