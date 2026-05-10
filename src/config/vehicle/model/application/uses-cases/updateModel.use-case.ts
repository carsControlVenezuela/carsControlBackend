import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IModelRepository } from '../../domain/repositories/iModel.repository';
import { UpdateModelRequestDto } from '../dtos/requests/updateModel.request.dto';
import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { findModelOrFail } from '../helpers/findModelOrFail.helper';
import { ModelMapper } from '../mappers/model.mapper';
import { IUpdateModelPort } from '../ports/iUpdateModel.port';

export class UpdateModelUseCase implements IUpdateModelPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(id: string, request: UpdateModelRequestDto): Promise<ModelResponseDto> {
    this.logger.info(`Updating model with ID: ${id}`, { context: 'UpdateModelUseCase' });

    const existingModel = await findModelOrFail(this.modelRepository, id);
    const updated = ModelMapper.merge(existingModel, request);
    await this.modelRepository.update(updated);

    this.logger.info(`Model updated successfully: ${updated.name} (ID: ${updated.id})`, {
      context: 'UpdateModelUseCase',
    });

    return ModelMapper.toResponse(updated);
  }
}
