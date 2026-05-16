import { DeepPartial, Repository } from 'typeorm';
import { Model } from '../../../../../domain/entities/model.entity';
import { IModelRepository } from '../../../../../domain/repositories/iModel.repository';
import { BaseTypeormRepository } from '../../../../../../../../core/infrastructure/database/repositories/base.repository';
import { ModelEntity } from '../entities/model.typeorm.entity';
import { ModelTypeormMapper } from '../../../../http/mappers/model.http.mapper';

export class ModelTypeormRepository extends BaseTypeormRepository<Model, ModelEntity> implements IModelRepository {

  constructor(repo: Repository<ModelEntity>) {
    super(repo);
  }

  protected toDomain(entity: ModelEntity): Model {
    return ModelTypeormMapper.toDomain(entity);
  }

  protected toPersistence(model: Model): DeepPartial<ModelEntity> {
    return ModelTypeormMapper.toPersistence(model);
  }

  async save(model: Model): Promise<Model> {
    const saved = await this.repo.save(this.repo.create(ModelTypeormMapper.toPersistence(model)));
    return ModelTypeormMapper.toDomain(saved);
  }

  async findByName(name: string): Promise<Model | null> {
    const entity = await this.repo
      .createQueryBuilder('model')
      .where('LOWER(model.name) = LOWER(:name)', { name })
      .getOne();
    return entity ? ModelTypeormMapper.toDomain(entity) : null;
  }

  async findByBrand(idBrand: string): Promise<Model[]> {
    const entities = await this.repo.find({ where: { idBrand } });
    return entities.map(e => ModelTypeormMapper.toDomain(e));
  }

}
