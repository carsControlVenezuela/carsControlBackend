import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { MunicipalityAlreadyExistsException } from "../../domain/exceptions/municipalityAlreadyExists.exception";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityRequestDto } from "../dtos/requests/municipality.request.dto";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { ICreateMunicipalityPort } from "../ports/iCreateMunicipality.port";

export class CreateMunicipalityUseCase implements ICreateMunicipalityPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly MunicipalityRepository : IMunicipalityRepository) {}

    async execute(request: MunicipalityRequestDto) : Promise<void> {

        this.logger.info('Iniciando creación de municipio', {context: 'CreateMunicipalityUseCase', name: request.name, idCountry: request.idState});

        const exists = await this.MunicipalityRepository.findByName(request.name);

        if (exists) {
            throw new MunicipalityAlreadyExistsException(request.name);
        }

        await this.MunicipalityRepository.save(MunicipalityMapper.toDomain(request));

        this.logger.info('Municipio creado exitosamente', {context: 'CreateMunicipalityUseCase'});
    }

}