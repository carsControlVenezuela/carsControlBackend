import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { findParishOrFail } from "../helpers/findParishOrFail.helper";
import { ParishMapper } from "../mappers/parish.mapper";
import { IUpdateParishActivePort } from "../ports/iUpdateParishActive.port";

export class UpdateParishActiveUseCase implements IUpdateParishActivePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private ParishRepository: IParishRepository) {}

    async execute(id: string): Promise<ParishResponseDto> {
        
        this.logger.info(`Actualizando el estado activo de la parroquia con id ${id}`, {context: 'UpdateParishActiveUseCase'});

        const Parish = await findParishOrFail(this.ParishRepository, id);

        Parish.toggle();

        await this.ParishRepository.update(Parish);

        this.logger.info(`El estado activo de la parroquia con id ${id} ha sido actualizado`, {context: 'UpdateParishActiveUseCase'});

        return ParishMapper.toResponse(Parish);

    }
}