import { Model } from '../entities/model.entity';

export interface IModelRepository {
  save(model: Model): Promise<Model>;
  findById(id: string): Promise<Model | null>;
  findAll(): Promise<Model[]>;
  findByBrand(idBrand: string): Promise<Model[]>;
  findByName(name: string): Promise<Model | null>;
  delete(id: string): Promise<void>;
}