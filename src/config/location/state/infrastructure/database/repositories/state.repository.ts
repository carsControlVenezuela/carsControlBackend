import { DeepPartial, Repository } from "typeorm";
import { IStateRepository } from "../../../domain/repositories/iState.repository";
import { StateEntity } from "../psql/typeorm/entities/state.typeorm.entity";
import { State } from "../../../domain/entities/state.entity";
import { StateTypeormMapper } from "../../http/mappers/state.http.mapper";
import { BaseTypeormRepository } from "../../../../../../core/infrastructure/database/repositories/base.repository";
import { PaginatedResult, PaginationParams } from "../../../../../../core/domain/types/pagination.types";

export class StateRepository extends BaseTypeormRepository<State, StateEntity> implements IStateRepository{

    constructor(repo: Repository<StateEntity>) {
        super(repo); 
    }

    protected toDomain(entity: StateEntity): State {
        return StateTypeormMapper.toDomain(entity);
    }

    protected toPersistence(state: State): DeepPartial<StateEntity> {
        return StateTypeormMapper.toPersistence(state);
    }

    protected getRelations(): string[] {
        return ['country']; // exclusivo de State
    }
    
    async save(state: State): Promise<void> {
        
        await this.repo.save(this.repo.create(StateTypeormMapper.toPersistence(state)));

    }

    async findAllByKeywords(name: string): Promise<State[]> {

        const entities = await this.repo
            .createQueryBuilder('state')
            .innerJoinAndSelect('state.country', 'country')
            .where('LOWER(state.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        return entities.map(StateTypeormMapper.toDomain);
    }

    async findByCountry(countryId: string): Promise<State[]> {

        const entities = await this.repo
            .createQueryBuilder('state')
            .innerJoinAndSelect('state.country', 'country')
            .where('country.id = :countryId', { countryId })
            .andWhere('state.active = :active', { active: true })
            .getMany(); 

        return entities.map(StateTypeormMapper.toDomain);
    }

    async findByCountryPaginated(countryId: string, params: PaginationParams): Promise<PaginatedResult<State>> {
        const { page, limit } = params;
        const skip = (page - 1) * limit;

        const [entities, total] = await this.repo
            .createQueryBuilder('state')
            .innerJoinAndSelect('state.country', 'country')
            .where('country.id = :countryId', { countryId })
            .andWhere('state.active = :active', { active: true })
            .skip(skip)
            .take(limit)
            .orderBy('state.name', 'ASC')
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            data: entities.map(StateTypeormMapper.toDomain),
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
    }
}