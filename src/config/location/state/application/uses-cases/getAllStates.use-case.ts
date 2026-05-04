import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { IGetAllStatesPort } from "../ports/iGetAllStates.port";
import { StateMapper } from "../mappers/state.mapper";

export class GetAllStatesUseCase implements IGetAllStatesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly stateRepository: IStateRepository) {}

    async execute(): Promise<StateResponseDto[]> {

        this.logger.info('Obteniendo todos los estados', {context: 'GetAllStatesUseCase'});

        const states = await this.stateRepository.findAll();

        this.logger.info(`Se encontraron ${states.length} estados`, {context: 'GetAllStatesUseCase'});

        return states.map(StateMapper.toResponse);
    }

}