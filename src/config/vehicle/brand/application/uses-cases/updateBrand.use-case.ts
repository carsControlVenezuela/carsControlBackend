import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IBrandRepository } from '../../domain/repositories/iBrand.repository';
import { UpdateBrandRequestDto } from '../dtos/requests/updateBrand.request.dto';
import { BrandResponseDto } from '../dtos/responses/brand.response.dto';
import { findBrandOrFail } from '../helpers/findBrandOrFail.helper';
import { BrandMapper } from '../mappers/brand.mapper';
import { IUpdateBrandPort } from '../ports/iUpdateBrand.port';

export class UpdateBrandUseCase implements IUpdateBrandPort {
  private readonly logger: ILogger = AppLogger;

  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(id: string, request: UpdateBrandRequestDto): Promise<BrandResponseDto> {
    this.logger.info(`Updating brand with ID: ${id}`, { context: 'UpdateBrandUseCase' });

    const existingBrand = await findBrandOrFail(this.brandRepository, id);
    const updated = BrandMapper.merge(existingBrand, request);
    await this.brandRepository.update(updated);

    this.logger.info(`Brand updated successfully: ${updated.name} (ID: ${updated.id})`, {
      context: 'UpdateBrandUseCase',
    });

    return BrandMapper.toResponse(updated);
  }
}
