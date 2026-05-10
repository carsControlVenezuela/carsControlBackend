import { Brand } from '../entities/brand.entity';

export interface IBrandRepository {
  save(brand: Brand): Promise<Brand>;
  findById(id: string): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  findByName(name: string): Promise<Brand | null>;
  update(brand: Brand): Promise<void>;
  delete(id: string): Promise<void>;
}