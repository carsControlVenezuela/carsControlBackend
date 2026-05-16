import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { findCountryOrFail } from "../../../country/application/helpers/findCountryOrFail.helper";
import { CountryRepository } from "../../../country/infrastructure/database/repositories/country.repository";
import { StatesNotFoundByIdCountryException } from "../../domain/exceptions/statesNotFoundByIdCountry.exceptions";
import { StateRepository } from "../../infrastructure/database/repositories/state.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { StateMapper } from "../mappers/state.mapper";
import { IGetStatesByCountryPort } from "../ports/IGetStateByCountry.port";

export class GetStatesByCountryUseCase implements IGetStatesByCountryPort {
    
    private readonly logger: ILogger = AppLogger;

    constructor(
        private readonly stateRepository: StateRepository
    ) {}

    async execute(countryId: string): Promise<StateResponseDto[]> {

        this.logger.info(`Buscando estados por país: ${countryId}`, {context: 'GetStatesByCountryUseCase'});

        const states = await this.stateRepository.findByCountry(countryId);

        if(states.length === 0 ) throw new StatesNotFoundByIdCountryException(countryId);

        this.logger.info(`Se encontraron ${states.length} estados`, {context: 'GetStatesByCountryUseCase'});

        return states.map(StateMapper.toResponse);
    }

}