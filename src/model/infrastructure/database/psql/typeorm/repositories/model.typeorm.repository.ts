import { DeepPartial } from 'typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../../database/typeorm/typeorm.config';
import { Model } from '../../../../../domain/entities/model.entity';
import { IModelRepository } from '../../../../../domain/repositories/iModel.repository';
import { ModelEntity } from '../entities/model.typeorm.entity';
import { ModelTypeormMapper } from '../../../../http/mappers/model.http.mapper';

export class ModelTypeormRepository implements IModelRepository {
  private readonly repository: Repository<ModelEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ModelEntity);
  }

  async save(model: Model): Promise<Model> {
    const entity = this.toPersistence(model);
    const saved = await this.repository.save(entity as ModelEntity);
    return ModelTypeormMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Model | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ModelTypeormMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Model[]> {
    const entities = await this.repository.find();
    return entities.map(ModelTypeormMapper.toDomain);
  }

  async findByBrand(idBrand: string): Promise<Model[]> {
    const entities = await this.repository.find({ where: { idBrand } });
    return entities.map(ModelTypeormMapper.toDomain);
  }

  async findByName(name: string): Promise<Model | null> {
    const entity = await this.repository.createQueryBuilder('model')
      .where('LOWER(model.name) = LOWER(:name)', { name })
      .getOne();
    return entity ? ModelTypeormMapper.toDomain(entity) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async update(model: Model): Promise<void> {
    const entity = this.toPersistence(model);
    await this.repository.save(entity as ModelEntity);
  }

  private toPersistence(model: Model): DeepPartial<ModelEntity> {
    return {
      id: model.id,
      name: model.name,
      idBrand: model.idBrand,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      active: model.active,
      createdBy: model.createdBy,
      updatedBy: model.updatedBy,
    };
  }
}