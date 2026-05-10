import { Model } from '../entities/model.entity';

export interface IModelRepository {
  save(model: Model): Promise<Model>;
  findById(id: string): Promise<Model | null>;
  findAll(): Promise<Model[]>;
  findByBrand(idBrand: string): Promise<Model[]>;
  findByName(name: string): Promise<Model | null>;
  update(model: Model): Promise<void>;
  delete(id: string): Promise<void>;
}