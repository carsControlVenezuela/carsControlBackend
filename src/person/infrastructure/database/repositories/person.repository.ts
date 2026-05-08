import { Brackets, DeepPartial, Repository } from 'typeorm';
import { Person } from '../../../domain/entities/person.entity';
import { IPersonRepository } from '../../../domain/repositories/iPerson.repository';
import { BaseTypeormRepository } from '../../../../core/infrastructure/database/repositories/base.repository';
import { PersonEntity } from '../psql/typeorm/entities/person.typeorm.entity';
import { PersonTypeormMapper } from '../../http/mappers/person.http.mapper';

export class PersonRepository extends BaseTypeormRepository<Person, PersonEntity> implements IPersonRepository {

    constructor(repo: Repository<PersonEntity>) {
        super(repo); 
    }

    protected toDomain(entity: PersonEntity): Person {
        return PersonTypeormMapper.toDomain(entity);
    }

    protected toPersistence(state: Person): DeepPartial<PersonEntity> {
        return PersonTypeormMapper.toPersistence(state);
    }

    protected getRelations(): string[] {
        return ['user']; //Exclusivo de Person y faltaría (Zonal Postal)
    }

    async save(person: Person): Promise<void> {

        await this.repo.save(this.repo.create(PersonTypeormMapper.toPersistence(person)));

    }

    async findByUserId(idUser: string): Promise<Person | null> {

        const entity = await this.repo
            .createQueryBuilder('person')
            .innerJoinAndSelect('person.user', 'user')
            .where('user.id = :idUser', { idUser })
            .andWhere('person.active = :active', { active: true })
            .getOne();

        if (!entity) return null;

        return PersonTypeormMapper.toDomain(entity);
    }

    async findByCedula(cedula: string): Promise<Person | null> {
        const entity = await this.repo.findOne({ where: { cedula }, relations: this.getRelations() });
        if (!entity) return null;
        return PersonTypeormMapper.toDomain(entity);
    }

    async findAllByKeywords(term: string): Promise<Person[]> {
        const searchTerm = `%${term.toLowerCase()}%`;

        const entities = await this.repo
            .createQueryBuilder('person')
            .innerJoinAndSelect('person.user', 'user')
            .where(
                new Brackets((qb) => {
                    qb.where('LOWER(person.firstName) LIKE :term', { term: searchTerm })
                        .orWhere('LOWER(person.middleName) LIKE :term', { term: searchTerm })
                        .orWhere('LOWER(person.lastName) LIKE :term', { term: searchTerm })
                        .orWhere('LOWER(person.secondName) LIKE :term', { term: searchTerm })
                        .orWhere('person.cedula LIKE :term', { term: searchTerm })
                        // Incluso se puede buscar por campos de la tabla unida (user)
                        .orWhere('LOWER(user.email) LIKE :term', { term: searchTerm });
                }),
            )
            // Si se tiene un borrado lógico o se quiere solo los activos, se pone fuera del Bracket:
            // .andWhere('person.isActive = :active', { active: true }) 
            .getMany();

        return entities.map(PersonTypeormMapper.toDomain);
    }
    
}