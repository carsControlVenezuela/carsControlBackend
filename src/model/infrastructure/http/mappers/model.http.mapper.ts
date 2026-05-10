import { DeepPartial } from 'typeorm';
import { Model } from '../../../domain/entities/model.entity';
import { ModelEntity } from '../../database/psql/typeorm/entities/model.typeorm.entity';

export class ModelTypeormMapper {
  static toDomain(entity: ModelEntity): Model {
    return new Model(
      entity.name,
      entity.idBrand,
      entity.id,
      entity.createdAt,
      entity.updatedAt,
      entity.active,
      entity.createdBy,
      entity.updatedBy,
    );
  }

  static toPersistence(model: Model): DeepPartial<ModelEntity> {
    return {
      ...(model.id && { id: model.id }),
      name: model.name,
      idBrand: model.idBrand,
      active: model.active,
    };
  }
}