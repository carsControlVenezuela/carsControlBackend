import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { BrandAlreadyExistsException } from '../../domain/exceptions/brandAlreadyExists.exception';
import { IBrandRepository } from '../../domain/repositories/iBrand.repository';
import { BrandRequestDto } from '../dtos/requests/brand.request.dto';
import { BrandMapper } from '../mappers/brand.mapper';
import { ICreateBrandPort } from '../ports/iCreateBrand.port';

export class CreateBrandUseCase implements ICreateBrandPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(request: BrandRequestDto): Promise<void> {
    this.logger.info('Creating brand', { context: 'CreateBrandUseCase', name: request.name });

    const exists = await this.brandRepository.findByName(request.name);
    if (exists) throw new BrandAlreadyExistsException(request.name);

    await this.brandRepository.save(BrandMapper.toDomain(request));

    this.logger.info('Brand created successfully', { context: 'CreateBrandUseCase' });
  }
}
