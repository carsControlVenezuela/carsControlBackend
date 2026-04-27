import { CountryResponseDto } from '../dtos/responses/country.response.dto';

export interface IGetAllCountriesByKeywordsPort {
  execute(keyword: string): Promise<CountryResponseDto[]>;
}