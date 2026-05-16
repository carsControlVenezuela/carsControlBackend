import { DeepPartial, Repository } from 'typeorm';
import { Brand } from '../../../../../domain/entities/brand.entity';
import { IBrandRepository } from '../../../../../domain/repositories/iBrand.repository';
import { BaseTypeormRepository } from '../../../../../../../../core/infrastructure/database/repositories/base.repository';
import { BrandEntity } from '../entities/brand.typeorm.entity';
import { BrandTypeormMapper } from '../../../../http/mappers/brand.http.mapper';

export class BrandTypeormRepository extends BaseTypeormRepository<Brand, BrandEntity> implements IBrandRepository {

  constructor(repo: Repository<BrandEntity>) {
    super(repo);
  }

  protected toDomain(entity: BrandEntity): Brand {
    return BrandTypeormMapper.toDomain(entity);
  }

  protected toPersistence(brand: Brand): DeepPartial<BrandEntity> {
    return BrandTypeormMapper.toPersistence(brand);
  }

  async save(brand: Brand): Promise<Brand> {
    const saved = await this.repo.save(this.repo.create(BrandTypeormMapper.toPersistence(brand)));
    return BrandTypeormMapper.toDomain(saved);
  }

  async findByName(name: string): Promise<Brand | null> {
    const entity = await this.repo
      .createQueryBuilder('brand')
      .where('LOWER(brand.name) = LOWER(:name)', { name })
      .getOne();
    return entity ? BrandTypeormMapper.toDomain(entity) : null;
  }

}
