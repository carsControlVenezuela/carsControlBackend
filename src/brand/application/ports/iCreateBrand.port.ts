import { BrandRequestDto } from '../dtos/requests/brand.request.dto';

export interface ICreateBrandPort {
  execute(request: BrandRequestDto): Promise<void>;
}