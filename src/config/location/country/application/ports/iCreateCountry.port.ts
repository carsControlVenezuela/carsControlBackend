import { CountryRequestDto } from "../dtos/request/country.request.dto";

export interface ICreateCountryPort {
    execute(request: CountryRequestDto): Promise<void>;
}