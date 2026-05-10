import { Model } from '../../domain/entities/model.entity';
import { ModelRequestDto } from '../dtos/requests/model.request.dto';
import { IBrandRepository } from '../../../brand/domain/repositories/iBrand.repository';

export interface ICreateModelPort {
  execute(request: ModelRequestDto, brandRepository: IBrandRepository): Promise<Model>;
}