import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IModelRepository } from '../../domain/repositories/iModel.repository';
import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { ModelMapper } from '../mappers/model.mapper';
import { IGetModelsByBrandPort } from '../ports/iGetModelsByBrand.port';

export class GetModelsByBrandUseCase implements IGetModelsByBrandPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(idBrand: string): Promise<ModelResponseDto[]> {
    this.logger.info(`Getting models by brand: ${idBrand}`, { context: 'GetModelsByBrandUseCase' });

    const models = await this.modelRepository.findByBrand(idBrand);

    this.logger.info(`Found ${models.length} models`, { context: 'GetModelsByBrandUseCase' });

    return models.map(ModelMapper.toResponse);
  }
}
