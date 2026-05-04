import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ParishAlreadyExistsException } from "../../domain/exceptions/parishAlreadyExists.exception";
import { IParishRepository } from "../../domain/repositories/iParish.repository";
import { ParishRequestDto } from "../dtos/requests/parish.request.dto";
import { ParishMapper } from "../mappers/parish.mapper";
import { ICreateParishPort } from "../ports/iCreateParish.port";

export class CreateParishUseCase implements ICreateParishPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly ParishRepository : IParishRepository) {}

    async execute(request: ParishRequestDto) : Promise<void> {

        this.logger.info('Iniciando creación de parroquia', {context: 'CreateParishUseCase', name: request.name, idCountry: request.idMunicipality});

        const exists = await this.ParishRepository.findByName(request.name);

        if (exists) {
            throw new ParishAlreadyExistsException(request.name);
        }

        await this.ParishRepository.save(ParishMapper.toDomain(request));

        this.logger.info('Parroquia creado exitosamente', {context: 'CreateParishUseCase'});
    }

}