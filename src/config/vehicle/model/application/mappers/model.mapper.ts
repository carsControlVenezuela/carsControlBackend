import { Model } from '../../domain/entities/model.entity';
import { ModelRequestDto } from '../dtos/requests/model.request.dto';
import { ModelResponseDto } from '../dtos/responses/model.response.dto';
import { UpdateModelRequestDto } from '../dtos/requests/updateModel.request.dto';

export class ModelMapper {
  static toDomain(dto: ModelRequestDto): Model {
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

  static merge(existing: Model, dto: UpdateModelRequestDto): Model {
    if (dto.name !== undefined) existing.name = dto.name;
    return existing;
  }
}
