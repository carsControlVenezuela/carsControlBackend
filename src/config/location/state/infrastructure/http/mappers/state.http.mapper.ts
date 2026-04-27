import { DeepPartial } from 'typeorm';
import { State } from '../../../domain/entities/state.entity';
import { StateEntity } from '../../database/psql/typeorm/entities/state.typeorm.entity';

export class StateTypeormMapper {

  static toDomain(entity: StateEntity): State {
    return new State(
        entity.name,
        entity.country.id,
        entity.id,
        entity.createdAt,
        entity.updatedAt,
        entity.active
    );
  }

    static toPersistence(state: State): DeepPartial<StateEntity> {
        return {
            ...(state.getId && { id: state.getId }),
            name:    state.getName,
            active:  state.getActive,
            country: { id: state.getIdCountry }
        };
    }
  
}