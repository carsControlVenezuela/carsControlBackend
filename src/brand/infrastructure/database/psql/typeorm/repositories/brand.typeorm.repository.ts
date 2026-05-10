import { DeepPartial } from 'typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../../database/typeorm/typeorm.config';
import { Brand } from '../../../../../domain/entities/brand.entity';
import { IBrandRepository } from '../../../../../domain/repositories/iBrand.repository';
import { BrandEntity } from '../entities/brand.typeorm.entity';
import { BrandTypeormMapper } from '../../../../http/mappers/brand.http.mapper';

export class BrandTypeormRepository implements IBrandRepository {
  private readonly repository: Repository<BrandEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(BrandEntity);
  }

  async save(brand: Brand): Promise<Brand> {
    const entity = this.toPersistence(brand);
    const saved = await this.repository.save(entity as BrandEntity);
    return BrandTypeormMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Brand | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? BrandTypeormMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Brand[]> {
    const entities = await this.repository.find();
    return entities.map(BrandTypeormMapper.toDomain);
  }

  async findByName(name: string): Promise<Brand | null> {
    const entity = await this.repository.createQueryBuilder('brand')
      .where('LOWER(brand.name) = LOWER(:name)', { name })
      .getOne();
    return entity ? BrandTypeormMapper.toDomain(entity) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async update(brand: Brand): Promise<void> {
    const entity = this.toPersistence(brand);
    await this.repository.save(entity as BrandEntity);
  }

  private toPersistence(brand: Brand): DeepPartial<BrandEntity> {
    return {
      id: brand.id,
      name: brand.name,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
      active: brand.active,
      createdBy: brand.createdBy,
      updatedBy: brand.updatedBy,
    };
  }
}