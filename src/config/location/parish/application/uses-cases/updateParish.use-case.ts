import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { UpdateParishRequestDto } from "../dtos/requests/updateParish.request.dtos";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { findParishOrFail } from "../helpers/findParishOrFail.helper";
import { ParishMapper } from "../mappers/parish.mapper";
import { IUpdateParishPort } from "../ports/iUpdateParish.port";

export class UpdateParishUseCase implements IUpdateParishPort {

    private readonly logger: ILogger = AppLogger;
    
    constructor( private readonly ParishRepository: IParishRepository ) {}

    async execute(id: string, request: UpdateParishRequestDto): Promise<ParishResponseDto> {

        this.logger.info(`Actualizando parroquia con ID: ${id}`, {context: 'UpdateParishUseCase'});

        const existingParish  = await findParishOrFail(this.ParishRepository, id);

        const update = ParishMapper.merge(existingParish, request);

        const updatedParish = await this.ParishRepository.update(update);

        this.logger.info(`Parroquia actualizada exitosamente: ${updatedParish.getName} (ID: ${updatedParish.getId})`, {context: 'UpdateParishUseCase'});

        return ParishMapper.toResponse(updatedParish);
    }

}