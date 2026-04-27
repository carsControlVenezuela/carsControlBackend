import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface IGetAllCountriesPort {
    getAllCountries(): Promise<CountryResponseDto[]>;
}