import { Country } from "../../domain/entities/country.entity";
import { CountryNotFoundException } from "../../domain/exceptions/countryNotFound.exception";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";


export async function findCountryOrFail(repository: ICountryRepository, id: string): Promise<Country> {
  const country = await repository.findById(id);
  if (!country) throw new CountryNotFoundException(id);
  return country;
}