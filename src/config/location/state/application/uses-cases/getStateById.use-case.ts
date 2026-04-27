import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { findStateOrFail } from "../helpers/findStateOrFail.helper";
import { StateMapper } from "../mappers/state.mapper";
import { IGetStateByIdPort } from "../ports/iGetStateById.port";

export class GetStateByIdUseCase implements IGetStateByIdPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly stateRepository: IStateRepository) {}

    async execute(id: string) : Promise<StateResponseDto> {

        this.logger.info(`Obteniendo estado con ID: ${id}`, {context: 'GetStateByIdUseCase'});

        const state = await findStateOrFail(this.stateRepository, id);
        
        this.logger.info(`Estado encontrado: ${state.getName} (ID: ${state.getId})`, {context: 'GetStateByIdUseCase'});

        return StateMapper.toResponse(state);

    }
}