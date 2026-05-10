import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IModelRepository } from '../../domain/repositories/iModel.repository';
import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { ModelMapper } from '../mappers/model.mapper';
import { IGetAllModelsPort } from '../ports/iGetAllModels.port';

export class GetAllModelsUseCase implements IGetAllModelsPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(): Promise<ModelResponseDto[]> {
    this.logger.info('Getting all models', { context: 'GetAllModelsUseCase' });

    const models = await this.modelRepository.findAll();

    this.logger.info(`Found ${models.length} models`, { context: 'GetAllModelsUseCase' });

    return models.map(ModelMapper.toResponse);
  }
}
