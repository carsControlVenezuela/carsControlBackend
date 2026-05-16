import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../../country/domain/repositories/ICountry.repository";
import { StateAlreadyExistsException } from "../../domain/exceptions/stateAlreadyExists.exception";
import { stateCreateWithIdCountryInvalidException } from "../../domain/exceptions/stateCreateWithIdCountryInvalid.exception";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { StateRequestDto } from "../dtos/requests/state.request.dto";
import { StateMapper } from "../mappers/state.mapper";
import { ICreateStatePort } from "../ports/iCreateState.port";

export class CreateStateUseCase implements ICreateStatePort {

    private readonly logger: ILogger = AppLogger;

    constructor(
        private readonly stateRepository : IStateRepository,
        private readonly countryRepository: ICountryRepository,
        
    ) {}

    async execute(request: StateRequestDto) : Promise<void> {

        this.logger.info('Iniciando creación de estado', {context: 'CreateStateUseCase', name: request.name, idCountry: request.idCountry});

        const exists = await this.stateRepository.findByName(request.name);

        if (exists) {
            throw new StateAlreadyExistsException(request.name);
        }

        if(request.idCountry){
            if(! await this.countryRepository.findById(request.idCountry)){
                throw new stateCreateWithIdCountryInvalidException(request.idCountry)
            }
        }

        await this.stateRepository.save(StateMapper.toDomain(request));

        this.logger.info('Estado creado exitosamente', {context: 'CreateStateUseCase'});
    }

}