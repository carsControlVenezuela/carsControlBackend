import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IBrandRepository } from '../../domain/repositories/iBrand.repository';
import { BrandResponseDto } from '../dtos/responses/brand.response.dto';
import { findBrandOrFail } from '../helpers/findBrandOrFail.helper';
import { BrandMapper } from '../mappers/brand.mapper';
import { IGetBrandByIdPort } from '../ports/iGetBrandById.port';

export class GetBrandByIdUseCase implements IGetBrandByIdPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(id: string): Promise<BrandResponseDto> {
    this.logger.info(`Getting brand with ID: ${id}`, { context: 'GetBrandByIdUseCase' });

    const brand = await findBrandOrFail(this.brandRepository, id);

    this.logger.info(`Brand found: ${brand.name} (ID: ${brand.id})`, {
      context: 'GetBrandByIdUseCase',
    });

    return BrandMapper.toResponse(brand);
  }
}
