import { DeepPartial } from 'typeorm';
import { Brand } from '../../../domain/entities/brand.entity';
import { BrandEntity } from '../../database/psql/typeorm/entities/brand.typeorm.entity';

export class BrandTypeormMapper {
  static toDomain(entity: BrandEntity): Brand {
    return new Brand(
      entity.name,
      entity.id,
      entity.createdAt,
      entity.updatedAt,
      entity.active,
      entity.createdBy,
      entity.updatedBy,
    );
  }

  static toPersistence(brand: Brand): DeepPartial<BrandEntity> {
    return {
      ...(brand.id && { id: brand.id }),
      name: brand.name,
      active: brand.active,
    };
  }
}