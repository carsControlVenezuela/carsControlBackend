import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { CountryNotFoundByKeywordException } from "../../domain/exceptions/countryNotFoundByKeyword.exception";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { CountryMapper } from "../mappers/country.mapper";
import { IGetAllCountriesByKeywordsPort } from "../ports/iGetAllCountriesByKeywords.port";

export class GetAllCountriesByKeywordsUseCase implements IGetAllCountriesByKeywordsPort {

  private readonly logger: ILogger = AppLogger;
    
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(keyword: string): Promise<CountryResponseDto[]> {

    this.logger.info(`Buscando países con la palabra clave: ${keyword}`, {context: 'GetAllCountriesByKeywordsUseCase'});

    const countries = await this.countryRepository.findAllByKeywords(keyword);

    if (countries.length === 0) throw new CountryNotFoundByKeywordException();

    this.logger.info(`Se encontraron ${countries.length} países`, {context: 'GetAllCountriesByKeywordsUseCase'});

    return countries.map(CountryMapper.toResponse);
  }
}