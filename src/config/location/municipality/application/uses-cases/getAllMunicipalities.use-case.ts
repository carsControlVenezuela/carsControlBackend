import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IGetAllMunicipalitiesPort } from "../ports/iGetAllMunicipalities.port";

export class GetAllmunicipalitiesUseCase implements IGetAllMunicipalitiesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly municipalityRepository: IMunicipalityRepository) {}

    async execute(): Promise<MunicipalityResponseDto[]> {

        this.logger.info('Obteniendo todos los municipios', {context: 'GetAllMunicipalitiesUseCase'});

        const municipalities = await this.municipalityRepository.findAll();

        this.logger.info(`Se encontraron ${municipalities.length} municipios`, {context: 'GetAllMunicipalitiesUseCase'});

        return municipalities.map(MunicipalityMapper.toResponse);
    }

}