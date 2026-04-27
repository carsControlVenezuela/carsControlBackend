import { Country } from "../../../domain/entities/country.entity";
import { CountryRequestDTO } from "../dtos/requests/country.request.dto";

export class CountryHttpMapper{
    public static toDomain(dto: CountryRequestDTO): Country {
        return new Country(dto.name);
    }
}