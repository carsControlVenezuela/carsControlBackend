import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { MunicipalityNotFoundByKeywordException } from "../../domain/exceptions/municipalityNotFoundByKeyword.exception";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IGetAllMunicipalitiesByKeywordsPort } from "../ports/iGetAllMunicipalitiesByKeywords.port";

export class GetAllMunicipalitiesByKeywordsUseCase implements IGetAllMunicipalitiesByKeywordsPort{

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly MunicipalityRepository: IMunicipalityRepository) {}

    async execute(keyword: string) : Promise<MunicipalityResponseDto[]> {

        this.logger.info(`Buscando municipios con la palabra clave: ${keyword}`, {context: 'GetAllMunicipalitiesByKeywordsUseCase'});

        const Municipalities = await this.MunicipalityRepository.findAllByKeywords(keyword);

        if (Municipalities.length === 0) throw new MunicipalityNotFoundByKeywordException();

        this.logger.info(`Se encontraron ${Municipalities.length} municipios`, {context: 'GetAllMunicipalitiesByKeywordsUseCase'});

        return Municipalities.map(MunicipalityMapper.toResponse);

    }

}