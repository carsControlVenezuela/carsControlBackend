import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { UpdateMunicipalityRequestDto } from "../dtos/requests/updateMunicipality.request.dtos";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { findMunicipalityOrFail } from "../helpers/findMunicipalityOrFail.helper";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IUpdateMunicipalityPort } from "../ports/iUpdateMunicipality.port";

export class UpdateMunicipalityUseCase implements IUpdateMunicipalityPort {

    private readonly logger: ILogger = AppLogger;
    
    constructor( private readonly MunicipalityRepository: IMunicipalityRepository ) {}

    async execute(id: string, request: UpdateMunicipalityRequestDto): Promise<MunicipalityResponseDto> {

        this.logger.info(`Actualizando municipio con ID: ${id}`, {context: 'UpdateMunicipalityUseCase'});

        const existingMunicipality  = await findMunicipalityOrFail(this.MunicipalityRepository, id);

        const update = MunicipalityMapper.merge(existingMunicipality, request);

        const updatedMunicipality = await this.MunicipalityRepository.update(update);

        this.logger.info(`Municipio actualizado exitosamente: ${updatedMunicipality.getName} (ID: ${updatedMunicipality.getId})`, {context: 'UpdateMunicipalityUseCase'});

        return MunicipalityMapper.toResponse(updatedMunicipality);
    }

}