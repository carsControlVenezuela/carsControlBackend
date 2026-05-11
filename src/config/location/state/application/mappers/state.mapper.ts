import { State } from '../../domain/entities/state.entity';
import { StateRequestDto } from '../dtos/requests/state.request.dto';
import { UpdateStateRequestDto } from '../dtos/requests/updateState.request.dto';
import { StateResponseDto } from '../dtos/responses/state.response.dto';

export class StateMapper {
  public static toResponse(state: State): StateResponseDto {
    if (!state.getId) {
      throw new Error('El estado sin identificación no se puede asignar a la respuesta');
    }
    return {
      id: state.getId,
      idCountry: state.getIdCountry,
      name: state.getName,
      active: state.active,
      createdAt: state.createdAt,
      updatedAt: state.updatedAt,
    };
  }

  static toDomain(dto: StateRequestDto): State {
    return new State(dto.name, dto.idCountry);
  }

  static merge(existing: State, dto: UpdateStateRequestDto): State {
    if (dto.idCountry) {
      existing.setIdCountry = dto.idCountry;
    }

    if (dto.name) {
      existing.setName = dto.name;
    }

    return existing;
  }
}
