import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { findParishOrFail } from "../helpers/findParishOrFail.helper";
import { IUpdateParishDisablePort } from "../ports/iUpdateParishDisable.port";


export class UpdateParishDisableUseCase implements IUpdateParishDisablePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private ParishRepository: IParishRepository) {}

    async execute(id: string): Promise<void> {

        this.logger.info(`Actualizando el estado deshabilitado de la parroquia con id ${id}`, {context: 'UpdateParishDisableUseCase'});

        const Parish = await findParishOrFail(this.ParishRepository, id);

        Parish.deactivate();

        await this.ParishRepository.update(Parish);

        this.logger.info(`Se ha eliminado la parroquia con id ${id} ha sido actualizado`, {context: 'UpdateParishDisableUseCase'});

    }
}