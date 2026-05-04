import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { findMunicipalityOrFail } from "../helpers/findMunicipalityOrFail.helper";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IUpdateMunicipalityActivePort } from "../ports/iUpdateMunicipalityActive.port";

export class UpdateMunicipalityActiveUseCase implements IUpdateMunicipalityActivePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private MunicipalityRepository: IMunicipalityRepository) {}

    async execute(id: string): Promise<MunicipalityResponseDto> {
        
        this.logger.info(`Actualizando el estado activo del municipio con id ${id}`, {context: 'UpdateMunicipalityActiveUseCase'});

        const Municipality = await findMunicipalityOrFail(this.MunicipalityRepository, id);

        Municipality.toggle();

        await this.MunicipalityRepository.update(Municipality);

        this.logger.info(`El estado activo del municipio con id ${id} ha sido actualizado`, {context: 'UpdateMunicipalityActiveUseCase'});

        return MunicipalityMapper.toResponse(Municipality);

    }
}