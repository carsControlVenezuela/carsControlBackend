import { ModelResponseDto } from '../dtos/responses/model.response.dto';

export interface IGetModelsByBrandPort {
  execute(idBrand: string): Promise<ModelResponseDto[]>;
}