import { IBaseRepository } from '../../../../../core/domain/repositories/base.repository';
import { Brand } from '../entities/brand.entity';

export interface IBrandRepository extends IBaseRepository<Brand> {
  save(brand: Brand): Promise<Brand>;
}
