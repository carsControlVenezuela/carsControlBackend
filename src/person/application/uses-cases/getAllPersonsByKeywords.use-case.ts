import { ILogger } from "../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../core/infrastructure/logger/winston.logger";
import { PersonsNotFoundByKeywordException } from "../../domain/exceptions/personsNotFoundByKeyword.exception";
import { IPersonRepository } from "../../domain/repositories/iPerson.repository";
import { PersonResponseDto } from "../dtos/responses/person.response.dto";
import { PersonMapper } from "../mappers/person.mapper";
import { IGetAllPersonsByKeywordsPort } from "../ports/iGetAllPersonsByKeywords.port";

export class GetAllPersonsByKeywordsUseCase implements IGetAllPersonsByKeywordsPort{

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly personRepository: IPersonRepository) {}

    async execute(keyword: string) : Promise<PersonResponseDto[]> {

        this.logger.info(`Buscando personas con la palabra clave: ${keyword}`, {context: 'GetAllPersonsByKeywordsUseCase'});

        const persons = await this.personRepository.findAllByKeywords(keyword);

        if (persons.length === 0) throw new PersonsNotFoundByKeywordException();

        this.logger.info(`Se encontraron ${persons.length} personas`, {context: 'GetAllPersonsByKeywordsUseCase'});

        return persons.map(PersonMapper.toResponse);

    }

}