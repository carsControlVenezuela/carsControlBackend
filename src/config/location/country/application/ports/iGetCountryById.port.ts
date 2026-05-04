import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface IGetCountryByIdPort {
    getCountryById(id: string): Promise<CountryResponseDto>;
}