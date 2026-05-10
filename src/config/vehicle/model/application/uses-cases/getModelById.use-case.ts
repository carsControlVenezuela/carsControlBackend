import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IModelRepository } from '../../domain/repositories/iModel.repository';
import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { findModelOrFail } from '../helpers/findModelOrFail.helper';
import { ModelMapper } from '../mappers/model.mapper';
import { IGetModelByIdPort } from '../ports/iGetModelById.port';

export class GetModelByIdUseCase implements IGetModelByIdPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(id: string): Promise<ModelResponseDto> {
    this.logger.info(`Getting model with ID: ${id}`, { context: 'GetModelByIdUseCase' });

    const model = await findModelOrFail(this.modelRepository, id);

    this.logger.info(`Model found: ${model.name} (ID: ${model.id})`, {
      context: 'GetModelByIdUseCase',
    });

    return ModelMapper.toResponse(model);
  }
}
