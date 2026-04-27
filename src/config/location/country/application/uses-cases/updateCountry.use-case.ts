import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { CountryRequestDto } from "../dtos/request/country.request.dto";
import { CountryResponseDto } from "../dtos/responses/country.response.dto";
import { findCountryOrFail } from "../helpers/findCountryOrFail.helper";
import { CountryMapper } from "../mappers/country.mapper";
import { IUpdateCountryPort } from "../ports/iUpdateCountry.port";

export class UpdateCountryUseCase implements IUpdateCountryPort {

    private readonly logger: ILogger = AppLogger;
    
    constructor( private readonly countryRepository: ICountryRepository ) {}

    async execute(id: string, request: CountryRequestDto): Promise<CountryResponseDto> {

        this.logger.info(`Actualizando país con ID: ${id}`, {context: 'UpdateCountryUseCase'});

        const existingCountry  = await findCountryOrFail(this.countryRepository, id);

        const update = CountryMapper.merge(existingCountry, request);

        const updatedCountry = await this.countryRepository.update(update);

        this.logger.info(`País actualizado exitosamente: ${updatedCountry.getName} (ID: ${updatedCountry.getId})`, {context: 'UpdateCountryUseCase'});

        return CountryMapper.toResponse(updatedCountry);
    }

}