import { Brand } from '../../domain/entities/brand.entity';
import { BrandRequestDto } from '../dtos/requests/brand.request.dto';
import { BrandResponseDto } from '../dtos/responses/brand.response.dto';

export class BrandMapper {
  static toDomain(dto: BrandRequestDto): Brand {
    return new Brand(dto.name);
  }

  static toResponse(brand: Brand): BrandResponseDto {
    return {
      id: brand.id,
      name: brand.name,
      active: brand.active,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    };
  }
}
