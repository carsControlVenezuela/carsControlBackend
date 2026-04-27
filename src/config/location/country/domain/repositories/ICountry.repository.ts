import { Country } from "../entities/country.entity";

export interface ICountryRepository {
    findById(id: string): Promise<Country | null>;
    findAll(): Promise<Country[]>;
    findAllActive(): Promise<Country[]>;
    findByName(name: string): Promise<Country | null>;
    findAllByKeywords(keyword: string): Promise<Country[]>;
    save(country: Country): Promise<Country>;
    update(country: Country): Promise<Country>;
}