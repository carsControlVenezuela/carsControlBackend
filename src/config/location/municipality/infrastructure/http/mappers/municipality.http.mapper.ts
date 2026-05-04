import { DeepPartial } from 'typeorm';
import { MunicipalityEntity } from '../../database/psql/typeorm/entities/municipality.typeorm.entity';
import { Municipality } from '../../../domain/entities/municipality.entity';

export class MunicipalityTypeormMapper {

    static toDomain(entity: MunicipalityEntity): Municipality {
        return new Municipality(
            entity.name,
            entity.state.id,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    static toPersistence(Municipality: Municipality): DeepPartial<MunicipalityEntity> {
        return {
            ...(Municipality.getId && { id: Municipality.getId }),
            name:    Municipality.getName,
            active:  Municipality.getActive,
            state: { id: Municipality.getIdState }
        };
    }
  
}