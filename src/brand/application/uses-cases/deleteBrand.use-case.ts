import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IDeleteBrandPort } from '../ports/iDeleteBrand.port';

export class DeleteBrandUseCase implements IDeleteBrandPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly executeFn: (id: string) => Promise<void>) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Deleting brand with ID: ${id}`, { context: 'DeleteBrandUseCase' });
    await this.executeFn(id);
    this.logger.info('Brand deleted successfully', { context: 'DeleteBrandUseCase' });
  }
}
