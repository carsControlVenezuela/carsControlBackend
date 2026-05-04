import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";
import { ParishMapper } from "../mappers/parish.mapper";
import { IGetAllParishesPort } from "../ports/iGetAllParishes.port";

export class GetAllParishesUseCase implements IGetAllParishesPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly ParishRepository: IParishRepository) {}

    async execute(): Promise<ParishResponseDto[]> {

        this.logger.info('Obteniendo todos las parroquias', {context: 'GetAllParishesUseCase'});

        const Parishes = await this.ParishRepository.findAll();

        this.logger.info(`Se encontraron ${Parishes.length} parroquias`, {context: 'GetAllParishesUseCase'});

        return Parishes.map(ParishMapper.toResponse);
    }

}