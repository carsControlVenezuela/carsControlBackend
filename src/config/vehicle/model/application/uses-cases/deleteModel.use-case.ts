import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IModelRepository } from '../../domain/repositories/iModel.repository';
import { IDeleteModelPort } from '../ports/iDeleteModel.port';

export class DeleteModelUseCase implements IDeleteModelPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Deleting model with ID: ${id}`, { context: 'DeleteModelUseCase' });
    await this.modelRepository.delete(id);
    this.logger.info('Model deleted successfully', { context: 'DeleteModelUseCase' });
  }
}
