import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { CountryMapper } from "../mappers/country.mapper";
import { IGetAllCountriesPort } from "../ports/iGetAllCountries.port";

export class GetAllCountriesUseCase implements IGetAllCountriesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly countryRepository: ICountryRepository) {}

    async getAllCountries(): Promise<CountryResponseDto[]> {

        this.logger.info('Obteniendo todos los países', {context: 'GetAllCountriesUseCase'});

        const countries = await this.countryRepository.findAll();

        this.logger.info(`Se encontraron ${countries.length} países`, {context: 'GetAllCountriesUseCase'});

        return countries.map(CountryMapper.toResponse);
    }

}