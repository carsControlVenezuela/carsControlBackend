import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface IUpdateCountryActivePort {
    execute(id: string): Promise<CountryResponseDto>;
}