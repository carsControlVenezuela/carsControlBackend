import { Model } from '../../domain/entities/model.entity';
import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { CreateModelRequestDto } from '../../infrastructure/http/dtos/requests/createModel.request.dto';

export class ModelMapper {
  static toDomain(dto: CreateModelRequestDto): Model {
    return new Model(dto.name, dto.idBrand);
  }

  static toResponse(model: Model): ModelResponseDto {
    return {
      id: model.id,
      idBrand: model.idBrand,
      name: model.name,
      active: model.active,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}
