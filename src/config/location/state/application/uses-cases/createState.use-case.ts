import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { StateAlreadyExistsException } from "../../domain/exceptions/stateAlreadyExists.exception";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateRequestDto } from "../dtos/requests/state.request.dto";
import { StateMapper } from "../mappers/state.mapper";
import { ICreateStatePort } from "../ports/iCreateState.port";

export class CreateStateUseCase implements ICreateStatePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly stateRepository : IStateRepository) {}

    async execute(request: StateRequestDto) : Promise<void> {

        this.logger.info('Iniciando creación de estado', {context: 'CreateStateUseCase', name: request.name, idCountry: request.idCountry});

        const exists = await this.stateRepository.findByName(request.name);

        if (exists) {
            throw new StateAlreadyExistsException(request.name);
        }

        const saved = await this.stateRepository.save(StateMapper.toDomain(request));

        this.logger.info('Estado creado exitosamente', {context: 'CreateStateUseCase', id: saved.getId});
    }

}