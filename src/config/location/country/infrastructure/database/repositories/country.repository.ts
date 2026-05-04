import { DeepPartial, Repository } from "typeorm";
import { CountryEntity } from "../psql/typeorm/entities/country.typeorm.entity";
import { ICountryRepository } from "../../../domain/repositories/ICountry.repository";
import { Country } from "../../../domain/entities/country.entity";
import { BaseTypeormRepository } from "../../../../../../core/infrastructure/database/repositories/base.repository";
import { CountryTypeormMapper } from "../../http/mappers/country.http.mapper";

export class CountryRepository extends BaseTypeormRepository<Country, CountryEntity> implements ICountryRepository {

    constructor(repo: Repository<CountryEntity>) {
        super(repo); 
    }

    protected toDomain(entity: CountryEntity): Country {
        return CountryTypeormMapper.toDomain(entity);
    }

    protected toPersistence(country: Country): DeepPartial<CountryEntity> {
        return CountryTypeormMapper.toPersistence(country);
    }

    async save(country: Country): Promise<void> {
            
        await this.repo.save(this.repo.create(CountryTypeormMapper.toPersistence(country)));
    
    }

    async findAllByKeywords(name: string): Promise<Country[]> {

        const entities = await this.repo
            .createQueryBuilder('country')
            .where('LOWER(country.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        return entities.map(CountryTypeormMapper.toDomain);
    }

}