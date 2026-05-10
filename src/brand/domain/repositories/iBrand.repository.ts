import { Brand } from '../entities/brand.entity';

export interface IBrandRepository {
  save(brand: Brand): Promise<void>;
  findById(id: string): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  findByName(name: string): Promise<Brand | null>;
  delete(id: string): Promise<void>;
}