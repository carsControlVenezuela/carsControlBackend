import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { ParishMapper } from "../mappers/parish.mapper";
import { IGetAllActiveParishesPort } from "../ports/iGetAllActiveParishes.port";

export class GetAllParishesActiveUseCase implements IGetAllActiveParishesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly ParishRepository: IParishRepository) {}

    async execute(): Promise<ParishResponseDto[]>{

        this.logger.info('Obteniendo todas las parroquias activas', {context: 'GetAllParishesActiveUseCase'});

        const Parishes = await this.ParishRepository.findAllActive();

        this.logger.info(`Se encontraron ${Parishes.length} parroquias activos`, {context: 'GetAllParishesActiveUseCase'});

        return Parishes.map(ParishMapper.toResponse);
    }
} 0