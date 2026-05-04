import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { findMunicipalityOrFail } from "../helpers/findMunicipalityOrFail.helper";
import { IUpdateMunicipalityDisablePort } from "../ports/iUpdateMunicipalityDisable.port";


export class UpdateMunicipalityDisableUseCase implements IUpdateMunicipalityDisablePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private MunicipalityRepository: IMunicipalityRepository) {}

    async execute(id: string): Promise<void> {

        this.logger.info(`Actualizando el estado deshabilitado del municipio con id ${id}`, {context: 'UpdateMunicipalityDisableUseCase'});

        const Municipality = await findMunicipalityOrFail(this.MunicipalityRepository, id);

        Municipality.deactivate();

        await this.MunicipalityRepository.update(Municipality);

        this.logger.info(`Se ha eliminado municipio con id ${id} ha sido actualizado`, {context: 'UpdateMunicipalityDisableUseCase'});

    }
}