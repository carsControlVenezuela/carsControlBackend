import { BrandResponseDto } from '../dtos/responses/brand.response.dto';
import { UpdateBrandRequestDto } from '../dtos/requests/updateBrand.request.dto';

export interface IUpdateBrandPort {
  execute(id: string, request: UpdateBrandRequestDto): Promise<BrandResponseDto>;
}
