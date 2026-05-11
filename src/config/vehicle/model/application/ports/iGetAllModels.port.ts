import { ModelResponseDto } from '../dtos/responses/model.response.dto';

export interface IGetAllModelsPort {
  execute(): Promise<ModelResponseDto[]>;
}