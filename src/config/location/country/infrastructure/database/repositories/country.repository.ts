import { DataSource, Repository } from "typeorm";
import { CountryEntity } from "../psql/typeorm/entities/country.typeorm.entity";
import { ICountryRepository } from "../../../domain/repositories/ICountry.repository";
import { Country } from "../../../domain/entities/country.entity";
import { AppLogger } from "../../../../../../core/infrastructure/logger/winston.logger";

export class CountryRepository implements ICountryRepository {

    private readonly repo : Repository<CountryEntity>;
    private readonly logger = AppLogger;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(CountryEntity);
    }

    async save(country: Country): Promise<Country> {
        
        this.logger.info('Iniciando guardado de país', {context: 'CountryRepository', name: country.getName});

        const countryEntity = this.repo.create({name: country.getName});
        const savedEntity = await this.repo.save(countryEntity);

        this.logger.debug('País guardado exitosamente', {context: 'CountryTypeormRepository',id: savedEntity.id});

        return new Country(savedEntity.name, savedEntity.id);    
    }

    async findById(id: string): Promise<Country | null> {

        this.logger.info('Iniciando búsqueda de país por ID', {context: 'CountryRepository', id});

        const countryEntity = await this.repo.findOneBy({ id: id });
        if (!countryEntity) {
            return null;
        }

        this.logger.debug('País encontrado por ID', {context: 'CountryRepository', id: countryEntity.id});

        return new Country(countryEntity.name, countryEntity.id, countryEntity.createdAt, countryEntity.updatedAt, countryEntity.active);
    }

    async findAll(): Promise<Country[]> {

        this.logger.info('Iniciando búsqueda de todos los países', {context: 'CountryRepository'});

        const countryEntities = await this.repo.find();

        this.logger.debug('Países encontrados', {context: 'CountryRepository', count: countryEntities.length});

        return countryEntities.map(entity => new Country(entity.name, entity.id, entity.createdAt, entity.updatedAt, entity.active));
    }

    async findAllActive(): Promise<Country[]> {

        this.logger.info('Iniciando búsqueda de todos los países activos', {context: 'CountryRepository'});
       
        const countryEntities = await this.repo.findBy({ active: true });

        this.logger.debug('Países activos encontrados', {context: 'CountryRepository', count: countryEntities.length});

        return countryEntities.map(entity => new Country(entity.name, entity.id, entity.createdAt, entity.updatedAt, entity.active));
    }

    async findByName(name: string): Promise<Country | null> {

        this.logger.info('Iniciando búsqueda de país por nombre', {context: 'CountryRepository', name});

        const country = await this.repo.findOneBy({ name });
        if (!country) return null;

        this.logger.debug('País encontrado por nombre', {context: 'CountryRepository', id: country.id});

        return new Country(country.name, country.id);
    }

    async findAllByKeywords(name: string): Promise<Country[]> {

        this.logger.info('Iniciando búsqueda de países por palabra clave', {context: 'CountryRepository', keyword: name});

        const entities = await this.repo
            .createQueryBuilder('country')
            .where('LOWER(country.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        this.logger.debug('Países encontrados por palabra clave', {context: 'CountryRepository', keyword: name, count: entities.length});

        return entities.map(e => new Country(e.name, e.id));
    }

    async update(country: Country): Promise<Country> {

        this.logger.info('Iniciando actualización de país', {context: 'CountryRepository', id: country.getId});

        await this.repo.save({
            id: country.getId,
            name: country.getName,
            active:    country.getActive,
            updatedAt: country.getUpdatedAt
        });

        this.logger.debug('País actualizado exitosamente', {context: 'CountryRepository', id: country.getId});
        
        return country;
    }
}