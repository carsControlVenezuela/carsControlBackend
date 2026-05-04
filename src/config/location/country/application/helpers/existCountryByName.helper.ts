import { CountryAlreadyExistsException } from "../../domain/exceptions/countryAlreadyExists.exception";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";

export async function existCountryByName(repository: ICountryRepository, name: string): Promise<void> {
    const exists = await repository.findByName(name);
    if (exists) throw new CountryAlreadyExistsException(name);
}