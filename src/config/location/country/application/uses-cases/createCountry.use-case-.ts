import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { ICreateCountryPort } from "../ports/iCreateCountry.port";
import { CountryMapper } from '../mappers/country.mapper';
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { CountryRequestDto } from "../dtos/request/country.request.dto";
import { CountryAlreadyExistsException } from "../../domain/exceptions/countryAlreadyExists.exception";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ILogger } from "../../../../../core/domain/logger/logger.interface";

export class CreateCountryUseCase implements ICreateCountryPort {

    private readonly logger: ILogger = AppLogger;

    constructor( private readonly countryRepository: ICountryRepository) {}

    async execute(request: CountryRequestDto): Promise<CountryResponseDto> {

        this.logger.info('Iniciando creación de país', {
            context: 'CreateCountryUseCase',
            name:    request.name
        });

        const exists = await this.countryRepository.findByName(request.name);

        if (exists) {
            throw new CountryAlreadyExistsException(request.name);
        }

        const saved = await this.countryRepository.save(CountryMapper.toDomain(request));

        this.logger.info('País creado exitosamente', {
            context: 'CreateCountryUseCase',
            id: saved.getId,
            name: saved.getName
        });

        return CountryMapper.toResponse(saved);
    }
}
