import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ParishNotFoundByKeywordException } from "../../domain/exceptions/parishNotFoundByKeyword.exception";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { ParishMapper } from "../mappers/parish.mapper";
import { IGetAllParishesByKeywordsPort } from "../ports/iGetAllParishesByKeywords.port";

export class GetAllParishesByKeywordsUseCase implements IGetAllParishesByKeywordsPort{

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly ParishRepository: IParishRepository) {}

    async execute(keyword: string) : Promise<ParishResponseDto[]> {

        this.logger.info(`Buscando parroquias con la palabra clave: ${keyword}`, {context: 'GetAllParishesByKeywordsUseCase'});

        const Parishes = await this.ParishRepository.findAllByKeywords(keyword);

        if (Parishes.length === 0) throw new ParishNotFoundByKeywordException();

        this.logger.info(`Se encontraron ${Parishes.length} parroquias`, {context: 'GetAllParishesByKeywordsUseCase'});

        return Parishes.map(ParishMapper.toResponse);

    }

}