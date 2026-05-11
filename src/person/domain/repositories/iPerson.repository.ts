import { IBaseRepository } from '../../../core/domain/repositories/base.repository';
import { Person } from '../entities/person.entity';

export interface IPersonRepository extends IBaseRepository<Person> {
    save(person: Person): Promise<void>;
    findByUserId(idUser: string): Promise<Person | null>;
    findByCedula(cedula: string): Promise<Person | null>;
    findAllByKeywords(term: string): Promise<Person[]>;
}