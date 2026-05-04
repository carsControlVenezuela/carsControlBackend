import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { StateMapper } from "../mappers/state.mapper";
import { IGetAllActiveStatesPort } from "../ports/iGetAllActiveStates.port";

export class GetAllStatesActiveUseCase implements IGetAllActiveStatesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly stateRepository: IStateRepository) {}

    async execute(): Promise<StateResponseDto[]>{

        this.logger.info('Obteniendo todos los estados activos', {context: 'GetAllStatesActiveUseCase'});

        const states = await this.stateRepository.findAllActive();

        this.logger.info(`Se encontraron ${states.length} estados activos`, {context: 'GetAllStatesActiveUseCase'});

        return states.map(StateMapper.toResponse);
    }
}