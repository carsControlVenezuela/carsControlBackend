import { DeepPartial } from 'typeorm';
import { Country } from '../../../domain/entities/country.entity';
import { CountryEntity } from '../../database/psql/typeorm/entities/country.typeorm.entity';

export class CountryTypeormMapper {
  static toDomain(entity: CountryEntity): Country {
    return new Country(entity.name, entity.id, entity.createdAt, entity.updatedAt, entity.active);
  }

  static toPersistence(country: Country): DeepPartial<CountryEntity> {
    return {
      ...(country.getId && { id: country.getId }),
      name: country.getName,
      active: country.active,
    };
  }
}
