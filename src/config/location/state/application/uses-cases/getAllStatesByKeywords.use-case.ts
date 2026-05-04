import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { StateNotFoundByKeywordException } from "../../domain/exceptions/stateNotFoundByKeyword.exception";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { StateMapper } from "../mappers/state.mapper";
import { IGetAllStatesByKeywordsPort } from "../ports/iGetAllStatesByKeywords.port";

export class GetAllStatesByKeywordsUseCase implements IGetAllStatesByKeywordsPort{

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly stateRepository: IStateRepository) {}

    async execute(keyword: string) : Promise<StateResponseDto[]> {

        this.logger.info(`Buscando estados con la palabra clave: ${keyword}`, {context: 'GetAllStatesByKeywordsUseCase'});

        const states = await this.stateRepository.findAllByKeywords(keyword);

        if (states.length === 0) throw new StateNotFoundByKeywordException();

        this.logger.info(`Se encontraron ${states.length} estados`, {context: 'GetAllStatesByKeywordsUseCase'});

        return states.map(StateMapper.toResponse);

    }

}