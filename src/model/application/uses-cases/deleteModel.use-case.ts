import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IDeleteModelPort } from '../ports/iDeleteModel.port';

export class DeleteModelUseCase implements IDeleteModelPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly executeFn: (id: string) => Promise<void>) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Deleting model with ID: ${id}`, { context: 'DeleteModelUseCase' });
    await this.executeFn(id);
    this.logger.info('Model deleted successfully', { context: 'DeleteModelUseCase' });
  }
}
