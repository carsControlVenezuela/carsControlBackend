import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { UpdateStateRequestDto } from "../dtos/requests/updateState.request.dto";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { findStateOrFail } from "../helpers/findStateOrFail.helper";
import { StateMapper } from "../mappers/state.mapper";
import { IUpdateStatePort } from "../ports/iUpdateState.port";

export class UpdateStateUseCase implements IUpdateStatePort {

    private readonly logger: ILogger = AppLogger;
    
    constructor( private readonly stateRepository: IStateRepository ) {}

    async execute(id: string, request: UpdateStateRequestDto): Promise<StateResponseDto> {

        this.logger.info(`Actualizando estado con ID: ${id}`, {context: 'UpdateStateUseCase'});

        const existingState  = await findStateOrFail(this.stateRepository, id);

        const update = StateMapper.merge(existingState, request);

        const updatedState = await this.stateRepository.update(update);

        this.logger.info(`Estado actualizado exitosamente: ${updatedState.getName} (ID: ${updatedState.getId})`, {context: 'UpdateStateUseCase'});

        return StateMapper.toResponse(updatedState);
    }

}