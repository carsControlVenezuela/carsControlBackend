import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { findParishOrFail } from "../helpers/findParishOrFail.helper";
import { ParishMapper } from "../mappers/parish.mapper";
import { IGetParishByIdPort } from "../ports/iGetParishById.port";

export class GetParishByIdUseCase implements IGetParishByIdPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly ParishRepository: IParishRepository) {}

    async execute(id: string) : Promise<ParishResponseDto> {

        this.logger.info(`Obteniendo parroquia con ID: ${id}`, {context: 'GetParishByIdUseCase'});

        const Parish = await findParishOrFail(this.ParishRepository, id);
        
        this.logger.info(`Parroquia encontrada: ${Parish.getName} (ID: ${Parish.getId})`, {context: 'GetParishByIdUseCase'});

        return ParishMapper.toResponse(Parish);

    }
}