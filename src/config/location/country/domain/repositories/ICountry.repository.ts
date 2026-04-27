import { IBaseRepository } from "../../../../../core/domain/repositories/base.repository";
import { Country } from "../entities/country.entity";

export interface ICountryRepository extends IBaseRepository<Country> {
    save(entity: Country): Promise<void>;
    findAllByKeywords(name: string): Promise<Country[]>
}