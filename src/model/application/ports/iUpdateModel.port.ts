import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { UpdateModelRequestDto } from '../dtos/requests/updateModel.request.dto';

export interface IUpdateModelPort {
  execute(id: string, request: UpdateModelRequestDto): Promise<ModelResponseDto>;
}
