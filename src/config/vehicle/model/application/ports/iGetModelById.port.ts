import { ModelResponseDto } from '../dtos/responses/model.response.dto';

export interface IGetModelByIdPort {
  execute(id: string): Promise<ModelResponseDto>;
}