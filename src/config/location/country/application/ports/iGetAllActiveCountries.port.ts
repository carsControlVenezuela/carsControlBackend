import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface IGetAllActiveCountriesPort {
    execute(): Promise<CountryResponseDto[]>;
}