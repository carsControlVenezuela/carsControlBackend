import { Brand } from '../../domain/entities/brand.entity';
import { BrandNotFoundException } from '../../domain/exceptions/brandNotFound.exception';
import { IBrandRepository } from '../../domain/repositories/iBrand.repository';

export async function findBrandOrFail(repository: IBrandRepository, id: string): Promise<Brand> {
  const brand = await repository.findById(id);
  if (!brand) throw new BrandNotFoundException(id);
  return brand;
}
