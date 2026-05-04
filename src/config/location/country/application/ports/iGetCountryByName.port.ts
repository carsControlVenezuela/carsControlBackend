import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface IGetCountryByNamePort {
    getCountryByName(name: string): Promise<CountryResponseDto>;
}