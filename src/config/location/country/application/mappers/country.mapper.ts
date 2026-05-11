import { Country } from '../../domain/entities/country.entity';
import { CountryRequestDto } from '../dtos/request/country.request.dto';
import { CountryResponseDto } from '../dtos/responses/country.response.dto';

export class CountryMapper {
  public static toResponse(country: Country): CountryResponseDto {
    if (!country.getId) {
      throw new Error('El país sin identificación no se puede asignar a la respuesta');
    }
    return {
      id: country.getId,
      name: country.getName,
      active: country.active,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    };
  }

  static toDomain(dto: CountryRequestDto): Country {
    return new Country(dto.name);
  }

  static merge(existing: Country, dto: CountryRequestDto): Country {
    dto.name ? (existing.setName = dto.name) : (existing.setName = existing.getName);
    return existing;
  }
}
