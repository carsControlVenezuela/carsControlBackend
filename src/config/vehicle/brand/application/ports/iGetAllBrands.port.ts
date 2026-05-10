import { BrandResponseDto } from '../dtos/responses/brand.response.dto';

export interface IGetAllBrandsPort {
  execute(): Promise<BrandResponseDto[]>;
}