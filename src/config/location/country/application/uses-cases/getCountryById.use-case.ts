import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { findCountryOrFail } from "../helpers/findCountryOrFail.helper";
import { CountryMapper } from "../mappers/country.mapper";
import { IGetCountryByIdPort } from "../ports/iGetCountryById.port";

export class GetCountryByIdUseCase implements IGetCountryByIdPort {

    private readonly logger: ILogger = AppLogger;
    
    constructor(private readonly countryRepository: ICountryRepository) {}

    async getCountryById(id: string) : Promise<CountryResponseDto> {

        this.logger.info(`Obteniendo país con ID: ${id}`, {context: 'GetCountryByIdUseCase'});
        
        const country = await findCountryOrFail(this.countryRepository, id);

        this.logger.info(`País encontrado: ${country.getName} (ID: ${country.getId})`, {context: 'GetCountryByIdUseCase'});

        return CountryMapper.toResponse(country);
        
    }
}