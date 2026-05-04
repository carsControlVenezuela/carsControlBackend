import { CountryRequestDto } from "../dtos/request/country.request.dto";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";

export interface IUpdateCountryPort {
  execute(id: string, request: CountryRequestDto): Promise<CountryResponseDto>;
}