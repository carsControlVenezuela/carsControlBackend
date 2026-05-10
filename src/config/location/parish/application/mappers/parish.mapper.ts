import { Parish } from '../../domain/entities/parish.entity';
import { ParishRequestDto } from '../dtos/requests/parish.request.dto';
import { UpdateParishRequestDto } from '../dtos/requests/updateParish.request.dtos';
import { ParishResponseDto } from '../dtos/responses/parish.response.dto';

export class ParishMapper {
  public static toResponse(Parish: Parish): ParishResponseDto {
    if (!Parish.getId) {
      throw new Error('La parroquia sin identificación no se puede asignar a la respuesta');
    }
    return {
      id: Parish.getId,
      idMunicipality: Parish.getIdMunicipality,
      name: Parish.getName,
      active: Parish.active,
      createdAt: Parish.createdAt,
      updatedAt: Parish.updatedAt,
    };
  }

  static toDomain(dto: ParishRequestDto): Parish {
    return new Parish(dto.name, dto.idMunicipality);
  }

  static merge(existing: Parish, dto: UpdateParishRequestDto): Parish {
    if (dto.idMunicipality) {
      existing.setIdMunicipality = dto.idMunicipality;
    }

    if (dto.name) {
      existing.setName = dto.name;
    }

    return existing;
  }
}
