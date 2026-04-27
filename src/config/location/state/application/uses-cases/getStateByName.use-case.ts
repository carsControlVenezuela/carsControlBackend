import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { StateNotFoundException } from "../../domain/exceptions/stateNotFound.exception";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { StateMapper } from "../mappers/state.mapper";
import { IGetStateByNamePort } from "../ports/iGetStateByName.port";

export class GetStateByNameUseCase implements IGetStateByNamePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly stateRepository: IStateRepository){}

    async execute(name: string): Promise<StateResponseDto> {

        this.logger.info(`Obteniendo estado con nombre: ${name}`, {context: 'GetStateByNameUseCase'});
        
        const state = await this.stateRepository.findByName(name);

        if (!state) {
            throw new StateNotFoundException(name);
        }

        this.logger.info(`Estado encontrado: ${state.getName} (ID: ${state.getId})`, {context: 'GetStateByNameUseCase'});

        return StateMapper.toResponse(state);

    }

}