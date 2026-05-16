import { IBaseRepository } from '../../../../../core/domain/repositories/base.repository';
import { Model } from '../entities/model.entity';

export interface IModelRepository extends IBaseRepository<Model> {
  save(model: Model): Promise<Model>;
  findByBrand(idBrand: string): Promise<Model[]>;
}
