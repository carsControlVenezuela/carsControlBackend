import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IBrandRepository } from '../../domain/repositories/iBrand.repository';
import { BrandResponseDto } from '../dtos/responses/brand.response.dto';
import { BrandMapper } from '../mappers/brand.mapper';
import { IGetAllBrandsPort } from '../ports/iGetAllBrands.port';

export class GetAllBrandsUseCase implements IGetAllBrandsPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(): Promise<BrandResponseDto[]> {
    this.logger.info('Getting all brands', { context: 'GetAllBrandsUseCase' });

    const brands = await this.brandRepository.findAll();

    this.logger.info(`Found ${brands.length} brands`, { context: 'GetAllBrandsUseCase' });

    return brands.map(BrandMapper.toResponse);
  }
}
