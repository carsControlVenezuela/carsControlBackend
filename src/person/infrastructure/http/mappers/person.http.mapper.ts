import { DeepPartial } from 'typeorm';
import { Person } from '../../../domain/entities/person.entity';
import { PersonEntity } from '../../database/psql/typeorm/entities/person.typeorm.entity';

export class PersonTypeormMapper {

    static toDomain(entity: PersonEntity): Person {
        return new Person(
            entity.idUser,
            //entity.idPostalZone,
            entity.cedula,
            entity.firstName,
            entity.lastName,
            entity.birthday,
            entity.gender,
            entity.avatar,
            entity.middleName,
            entity.secondName,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    static toPersistence(person: Person): DeepPartial<PersonEntity> {
        return {
            ...(person.getId && { id: person.getId }),
            idUser: person.getIdUser,
            //idPostalZone:  person.getIdPostalZone,
            cedula: person.getCedula,
            firstName: person.getFirstName,
            lastName: person.getLastName,
            birthday: person.getBirthday,
            gender: person.getGender,
            avatar: person.getAvatar,
            middleName: person.getMiddleName,
            secondName:  person.getSecondName,
            active: person.getActive
        };
    }
}