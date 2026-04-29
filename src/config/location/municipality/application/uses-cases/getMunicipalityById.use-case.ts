import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { findMunicipalityOrFail } from "../helpers/findMunicipalityOrFail.helper";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IGetMunicipalityByIdPort } from "../ports/iGetMunicipalityById.port";

export class GetMunicipalityByIdUseCase implements IGetMunicipalityByIdPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly MunicipalityRepository: IMunicipalityRepository) {}

    async execute(id: string) : Promise<MunicipalityResponseDto> {

        this.logger.info(`Obteniendo municipio con ID: ${id}`, {context: 'GetMunicipalityByIdUseCase'});

        const Municipality = await findMunicipalityOrFail(this.MunicipalityRepository, id);
        
        this.logger.info(`Municipio encontrado: ${Municipality.getName} (ID: ${Municipality.getId})`, {context: 'GetMunicipalityByIdUseCase'});

        return MunicipalityMapper.toResponse(Municipality);

    }
}