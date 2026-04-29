import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { MunicipalityNotFoundException } from "../../domain/exceptions/municipalityNotFound.exception";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";
import { MunicipalityMapper } from "../mappers/state.mapper";
import { IGetMunicipalityByNamePort } from "../ports/iGetMunicipalityByName.port";

export class GetMunicipalityByNameUseCase implements IGetMunicipalityByNamePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly MunicipalityRepository: IMunicipalityRepository){}

    async execute(name: string): Promise<MunicipalityResponseDto> {

        this.logger.info(`Obteniendo municipio con nombre: ${name}`, {context: 'GetMunicipalityByNameUseCase'});
        
        const Municipality = await this.MunicipalityRepository.findByName(name);

        if (!Municipality) {
            throw new MunicipalityNotFoundException(name);
        }

        this.logger.info(`Municipio encontrado: ${Municipality.getName} (ID: ${Municipality.getId})`, {context: 'GetMunicipalityByNameUseCase'});

        return MunicipalityMapper.toResponse(Municipality);

    }

}