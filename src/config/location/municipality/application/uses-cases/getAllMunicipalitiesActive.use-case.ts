import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IGetAllActiveMunicipalitiesPort } from "../ports/iGetAllActiveMunicipalities.port";

export class GetAllMunicipalitiesActiveUseCase implements IGetAllActiveMunicipalitiesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly MunicipalityRepository: IMunicipalityRepository) {}

    async execute(): Promise<MunicipalityResponseDto[]>{

        this.logger.info('Obteniendo todos los municipios activos', {context: 'GetAllMunicipalitiesActiveUseCase'});

        const Municipalities = await this.MunicipalityRepository.findAllActive();

        this.logger.info(`Se encontraron ${Municipalities.length} muninipios activos`, {context: 'GetAllMunicipalitiesActiveUseCase'});

        return Municipalities.map(MunicipalityMapper.toResponse);
    }
}