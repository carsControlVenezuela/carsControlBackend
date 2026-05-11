import { BrandResponseDto } from '../dtos/responses/brand.response.dto';

export interface IGetBrandByIdPort {
  execute(id: string): Promise<BrandResponseDto>;
}