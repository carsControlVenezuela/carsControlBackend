import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { findCountryOrFail } from "../helpers/findCountryOrFail.helper";
import { CountryMapper } from "../mappers/country.mapper";
import { IUpdateCountryActivePort } from "../ports/iUpdateCountryActive.port";

export class UpdateCountryActiveUseCase implements IUpdateCountryActivePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private countryRepository: ICountryRepository) {}

    async execute(id: string): Promise<CountryResponseDto> {
        
        this.logger.info(`Actualizando el estado activo del país con id ${id}`, {context: 'UpdateCountryActiveUseCase'});

        const country = await findCountryOrFail(this.countryRepository, id);

        country.toggle();

        await this.countryRepository.update(country);

        this.logger.info(`El estado activo del país con id ${id} ha sido actualizado`, {context: 'UpdateCountryActiveUseCase'});

        return CountryMapper.toResponse(country);

    }
}
