import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ParishNotFoundException } from "../../domain/exceptions/parishNotFound.exception";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { ParishMapper } from "../mappers/parish.mapper";
import { IGetParishByNamePort } from "../ports/iGetParishByName.port";

export class GetParishByNameUseCase implements IGetParishByNamePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly ParishRepository: IParishRepository){}

    async execute(name: string): Promise<ParishResponseDto> {

        this.logger.info(`Obteniendo parroquia con nombre: ${name}`, {context: 'GetParishByNameUseCase'});
        
        const Parish = await this.ParishRepository.findByName(name);

        if (!Parish) {
            throw new ParishNotFoundException(name);
        }

        this.logger.info(`Parroquia encontrada: ${Parish.getName} (ID: ${Parish.getId})`, {context: 'GetParishByNameUseCase'});

        return ParishMapper.toResponse(Parish);

    }

}