import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IBrandRepository } from '../../domain/repositories/iBrand.repository';
import { IDeleteBrandPort } from '../ports/iDeleteBrand.port';

export class DeleteBrandUseCase implements IDeleteBrandPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Deleting brand with ID: ${id}`, { context: 'DeleteBrandUseCase' });
    await this.brandRepository.delete(id);
    this.logger.info('Brand deleted successfully', { context: 'DeleteBrandUseCase' });
  }
}
