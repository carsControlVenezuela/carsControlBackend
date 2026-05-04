import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { CountryMapper } from "../mappers/country.mapper";
import { IGetAllActiveCountriesPort } from "../ports/iGetAllActiveCountries.port";

export class GetAllCountriesActiveUseCase implements IGetAllActiveCountriesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private countryRepository: ICountryRepository) {}

    async execute(): Promise<CountryResponseDto[]> {

        this.logger.info('Obteniendo todos los países activos', {context: 'GetAllCountriesActiveUseCase'});

        const countries = await this.countryRepository.findAllActive();

        this.logger.info(`Se encontraron ${countries.length} países activos`, {context: 'GetAllCountriesActiveUseCase'});

        return countries.map(CountryMapper.toResponse);
    }
}