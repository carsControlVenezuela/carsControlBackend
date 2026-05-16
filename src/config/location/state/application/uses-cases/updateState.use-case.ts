import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../../country/domain/repositories/ICountry.repository";
import { StateAlreadyExistsException } from "../../domain/exceptions/stateAlreadyExists.exception";
import { StateUpdateWithIdCountryInvalidException } from "../../domain/exceptions/stateUpdateWithIdCountryInvalid.exception";
import { IStateRepository } from "../../domain/repositories/iState.repository";
import { UpdateStateRequestDto } from "../dtos/requests/updateState.request.dto";
import { StateResponseDto } from "../dtos/responses/state.response.dto";
import { findStateOrFail } from "../helpers/findStateOrFail.helper";
import { StateMapper } from "../mappers/state.mapper";
import { IUpdateStatePort } from "../ports/iUpdateState.port";

export class UpdateStateUseCase implements IUpdateStatePort {

    private readonly logger: ILogger = AppLogger;
    
    constructor( 
        private readonly stateRepository: IStateRepository,
        private readonly countryRepository: ICountryRepository,

    ) {}

    async execute(id: string, request: UpdateStateRequestDto): Promise<StateResponseDto> {

        this.logger.info(`Actualizando estado con name: ${request.name}`, {context: 'UpdateStateUseCase'});

        if(request.idCountry){
            if(! await this.countryRepository.findById(request.idCountry)){
                throw new StateUpdateWithIdCountryInvalidException(request.idCountry)
            }
        }
        
        if(request.name){
            if (await this.stateRepository.findByName(request.name)) {
                throw new StateAlreadyExistsException(request.name);
            }
        }

        const existingState  = await findStateOrFail(this.stateRepository, id);

        const update = StateMapper.merge(existingState, request);

        const updatedState = await this.stateRepository.update(update);

        this.logger.info(`Estado actualizado exitosamente: ${updatedState.getName} (ID: ${updatedState.getId})`, {context: 'UpdateStateUseCase'});

        return StateMapper.toResponse(updatedState);
    }

}