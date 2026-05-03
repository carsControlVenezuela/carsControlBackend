import { Person } from '../../domain/entities/person.entity';
import { UpdatePersonInputDto } from '../dtos/requests/updatePerson.request.dto';
import { PersonResponseDto } from '../dtos/responses/person.response.dto';

export class PersonMapper {

    static toResponse(person: Person): PersonResponseDto {

        if (!person.getId) {
            throw new Error('Persona sin identificación no se puede asignar a la respuesta');
        }
        
        return {
            id: person.getId,
            idUser: person.getIdUser,
            //idPostalZone: person.getIdPostalZone,
            cedula: person.getCedula,
            firstName: person.getFirstName,
            lastName: person.getLastName,
            birthday: person.getBirthday,
            gender: person.getGender,
            avatar: person.getAvatar,
            middleName: person.getMiddleName,
            secondName: person.getSecondName,
            active: person.getActive,
            createdAt: person.getCreatedAt,
            updatedAt: person.getUpdatedAt
        };
    }

    static merge(existing: Person, dto: UpdatePersonInputDto): Person {
        if (dto.firstName) { existing.setFirstName = dto.firstName; }
        if (dto.lastName) { existing.setLastName = dto.lastName; }
        if (dto.cedula) { existing.setCedula = dto.cedula; }
        if (dto.avatar) { existing.setAvatar = dto.avatar; }
        if (dto.middleName) { existing.setMiddleName = dto.middleName; }
        if (dto.secondName) { existing.setSecondName = dto.secondName; }
        //if (dto.idPostalZone) {existing.setIdPostalZone = dto.idPostalZone;}
        return existing;
    }
}