import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { CountryMapper } from "../mappers/country.mapper";
import { IGetCountryByNamePort } from "../ports/iGetCountryByName.port";

export class GetCountryByNameUseCase implements IGetCountryByNamePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly countryRepository: ICountryRepository){}

    async getCountryByName(name: string): Promise<CountryResponseDto> {

        this.logger.info(`Obteniendo país con nombre: ${name}`, {context: 'GetCountryByNameUseCase'});
        
        const country = await this.countryRepository.findByName(name);

        if (!country) {
            throw new Error(`No se encontró el país con nombre: ${name}`);
        }

        this.logger.info(`País encontrado: ${country.getName} (ID: ${country.getId})`, {context: 'GetCountryByNameUseCase'});

        return CountryMapper.toResponse(country);

    }

}