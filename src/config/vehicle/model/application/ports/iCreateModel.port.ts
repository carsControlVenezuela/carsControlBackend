import { Model } from '../../domain/entities/model.entity';
import { ModelRequestDto } from '../dtos/requests/model.request.dto';

export interface ICreateModelPort {
  execute(request: ModelRequestDto): Promise<Model>;
}