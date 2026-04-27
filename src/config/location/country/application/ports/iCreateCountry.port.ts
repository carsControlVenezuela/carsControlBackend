import { CountryRequestDto } from "../dtos/request/country.request.dto";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface ICreateCountryPort {
    execute(request: CountryRequestDto): Promise<CountryResponseDto>;
}