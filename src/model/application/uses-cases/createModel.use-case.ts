import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IModelRepository } from '../../domain/repositories/iModel.repository';
import { Model } from '../../domain/entities/model.entity';
import { ModelRequestDto } from '../dtos/requests/model.request.dto';
import { ModelMapper } from '../mappers/model.mapper';
import { ICreateModelPort } from '../ports/iCreateModel.port';
import { BrandNotFoundException } from '../../domain/exceptions/brandNotFound.exception';
import { IBrandRepository } from '../../../brand/domain/repositories/iBrand.repository';

export class CreateModelUseCase implements ICreateModelPort {
  private readonly logger: ILogger = AppLogger;

  constructor(
    private readonly modelRepository: IModelRepository,
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(request: ModelRequestDto): Promise<Model> {
    this.logger.info('Creating model', {
      context: 'CreateModelUseCase',
      name: request.name,
      idBrand: request.idBrand,
    });

    const brand = await this.brandRepository.findById(request.idBrand);
    if (!brand) throw new BrandNotFoundException(request.idBrand);

    const model = await this.modelRepository.save(ModelMapper.toDomain(request));

    this.logger.info('Model created successfully', { context: 'CreateModelUseCase' });
    return model;
  }
}
