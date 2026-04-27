import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { ICreateCountryPort } from "../ports/iCreateCountry.port";
import { CountryMapper } from '../mappers/country.mapper';
import { CountryRequestDto } from "../dtos/request/country.request.dto";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { existCountryByName } from "../helpers/existCountryByName.helper";

export class CreateCountryUseCase implements ICreateCountryPort {

    private readonly logger: ILogger = AppLogger;

    constructor( private readonly countryRepository: ICountryRepository) {}

    async execute(request: CountryRequestDto): Promise<void> {

        this.logger.info('Iniciando creación de país', {
            context: 'CreateCountryUseCase',
            name:    request.name
        });

        await existCountryByName(this.countryRepository, request.name);

        await this.countryRepository.save(CountryMapper.toDomain(request));

    }
}
