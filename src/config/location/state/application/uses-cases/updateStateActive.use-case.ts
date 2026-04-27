import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { findStateOrFail } from "../helpers/findStateOrFail.helper";
import { StateMapper } from "../mappers/state.mapper";
import { IUpdateStateActivePort } from "../ports/iUpdateStateActive.port";

export class UpdateStateActiveUseCase implements IUpdateStateActivePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private stateRepository: IStateRepository) {}

    async execute(id: string): Promise<StateResponseDto> {
        
        this.logger.info(`Actualizando el estado activo del estado con id ${id}`, {context: 'UpdateStateActiveUseCase'});

        const state = await findStateOrFail(this.stateRepository, id);

        state.toggle();

        await this.stateRepository.update(state);

        this.logger.info(`El estado activo del estado con id ${id} ha sido actualizado`, {context: 'UpdateStateActiveUseCase'});

        return StateMapper.toResponse(state);

    }
}