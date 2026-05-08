import { ILogger } from "../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../core/infrastructure/logger/winston.logger";
import { IPersonRepository } from "../../domain/repositories/iPerson.repository";
import { UpdatePersonRequestDto } from "../dtos/requests/updatePerson.request.dto";
import { findPersonByCedulaOrFail } from "../helpers/findPersonByCedulaOrFail.helper";
import { findPersonOrFail } from "../helpers/findPersonOrFail.helper";
import { PersonMapper } from "../mappers/person.mapper";
import { IUpdatePersonPort } from "../ports/iUpdatePerson.port";

export class UpdatePersonUseCase implements IUpdatePersonPort {

    private readonly logger: ILogger = AppLogger;
    
    constructor( private readonly personRepository: IPersonRepository ) {}

    async execute(id: string, request: UpdatePersonRequestDto): Promise<void> {
        
        console.log("CHAOOOOO: ", request)

        this.logger.info(`Actualizando persona con ID: ${id}`, {context: 'UpdatePersonUseCase'});

        const person  = await findPersonOrFail(this.personRepository, id);

        console.log("HOLLAAAA: ", person)

        if(request.cedula) {
            await findPersonByCedulaOrFail(this.personRepository, request.cedula)
        };

        const update = PersonMapper.merge(person, request);

        const updatedPerson = await this.personRepository.update(update);

        this.logger.info(`Persona actualizado exitosamente: ${updatedPerson.getCedula} (ID: ${updatedPerson.getId})`, {context: 'UpdatePersonUseCase'});

    }

}