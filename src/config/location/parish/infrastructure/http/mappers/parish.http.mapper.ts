import { DeepPartial } from 'typeorm';
import { ParishEntity } from '../../database/psql/typeorm/entities/parish.typeorm.entity';
import { Parish } from '../../../domain/entities/parish.entity';

export class ParishTypeormMapper {

    static toDomain(entity: ParishEntity): Parish {
        return new Parish(
            entity.name,
            entity.municipality.id,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    static toPersistence(Parish: Parish): DeepPartial<ParishEntity> {
        return {
            ...(Parish.getId && { id: Parish.getId }),
            name:    Parish.getName,
            active:  Parish.getActive,
            municipality: { id: Parish.getIdMunicipality }
        };
    }
  
}