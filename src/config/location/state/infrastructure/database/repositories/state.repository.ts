import { DataSource, Repository } from "typeorm";
import { AppLogger } from "../../../../../../core/infrastructure/logger/winston.logger";
import { IStateRepository } from "../../../domain/repositories/iState.repository";
import { StateEntity } from "../psql/typeorm/entities/state.typeorm.entity";
import { State } from "../../../domain/entities/state.entity";
import { StateTypeormMapper } from "../../http/mappers/state.http.mapper";

export class StateRepository implements IStateRepository {

    private readonly repo : Repository<StateEntity>;
    private readonly logger = AppLogger;
    private readonly RELATIONS = { relations: ['country'] };

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(StateEntity);
    }

    async save(state: State): Promise<State> {
        
        this.logger.info('Iniciando guardado de estado', {context: 'StateRepository', state});

        const stateEntity = this.repo.create(StateTypeormMapper.toPersistence(state));
        const savedEntity = await this.repo.save(stateEntity);

        this.logger.debug('Estado guardado exitosamente', {context: 'StateRepository', idCountry: savedEntity.id});

        return StateTypeormMapper.toDomain(savedEntity);
  
    }

    async findById(id: string): Promise<State | null> {

        this.logger.info('Iniciando búsqueda de estado por ID', {context: 'StateRepository', id});

        const stateEntity = await this.repo.findOne({ where: { id: id }, ...this.RELATIONS });

        if (!stateEntity) {
            return null;
        }

        this.logger.debug('Estado encontrado por ID', {context: 'StateRepository', id: stateEntity.id});

        return StateTypeormMapper.toDomain(stateEntity);
    }

    async findAll(): Promise<State[]> {

        this.logger.info('Iniciando búsqueda de todos los estados', {context: 'StateRepository'});

        const stateEntities = await this.repo.find(this.RELATIONS);

        this.logger.debug('Estados encontrados', {context: 'StateRepository', count: stateEntities.length});

        return stateEntities.map(StateTypeormMapper.toDomain);
    }

    async findAllActive(): Promise<State[]> {

        this.logger.info('Iniciando búsqueda de todos los estados activos', {context: 'StateRepository'});
       
            const stateEntities = await this.repo.find({ where: { active: true }, ...this.RELATIONS });

        this.logger.debug('Estados activos encontrados', {context: 'StateRepository', count: stateEntities.length});

        return stateEntities.map(StateTypeormMapper.toDomain);
    }

    async findByName(name: string): Promise<State | null> {

        this.logger.info('Iniciando búsqueda de estado por nombre', {context: 'StateRepository', name});

        const state = await this.repo.findOne({ where: { name: name, active: true }, ...this.RELATIONS });

        if (!state) return null;

        this.logger.debug('Estado encontrado por nombre', {context: 'StateRepository', id: state.id});

        return StateTypeormMapper.toDomain(state);
    }

    async findAllByKeywords(name: string): Promise<State[]> {

        this.logger.info('Iniciando búsqueda de estados por palabra clave', {context: 'StateRepository', keyword: name});

        const entities = await this.repo
            .createQueryBuilder('state')
            .innerJoinAndSelect('state.country', 'country')
            .where('LOWER(state.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        this.logger.debug('Estados encontrados por palabra clave', {context: 'StateRepository', keyword: name, count: entities.length});

        return entities.map(StateTypeormMapper.toDomain);
    }

    async update(state: State): Promise<State> {

        this.logger.info('Iniciando actualización de estado', {context: 'StateRepository', id: state.getId});

        await this.repo.save(StateTypeormMapper.toPersistence(state));

        this.logger.debug('Estado actualizado exitosamente', {context: 'StateRepository', id: state.getId});

        return state;

    }
}