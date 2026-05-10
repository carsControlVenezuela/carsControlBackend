import { Municipality } from '../../domain/entities/municipality.entity';
import { MunicipalityRequestDto } from '../dtos/requests/municipality.request.dto';
import { UpdateMunicipalityRequestDto } from '../dtos/requests/updateMunicipality.request.dtos';
import { MunicipalityResponseDto } from '../dtos/responses/municipality.response.dto';

export class MunicipalityMapper {
  public static toResponse(municipality: Municipality): MunicipalityResponseDto {
    if (!municipality.getId) {
      throw new Error('El estado sin identificación no se puede asignar a la respuesta');
    }
    return {
      id: municipality.getId,
      idState: municipality.getIdState,
      name: municipality.getName,
      active: municipality.active,
      createdAt: municipality.createdAt,
      updatedAt: municipality.updatedAt,
    };
  }

  static toDomain(dto: MunicipalityRequestDto): Municipality {
    return new Municipality(dto.name, dto.idState);
  }

  static merge(existing: Municipality, dto: UpdateMunicipalityRequestDto): Municipality {
    if (dto.idState) {
      existing.setIdState = dto.idState;
    }

    if (dto.name) {
      existing.setName = dto.name;
    }

    return existing;
  }
}
