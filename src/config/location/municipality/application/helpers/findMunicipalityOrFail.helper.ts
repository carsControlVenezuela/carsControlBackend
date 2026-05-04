import { Municipality } from "../../domain/entities/municipality.entity";
import { MunicipalityNotFoundException } from "../../domain/exceptions/municipalityNotFound.exception";
import { IMunicipalityRepository } from "../../domain/repositories/iMunicipality.repository";

export async function findMunicipalityOrFail(repository: IMunicipalityRepository, id: string): Promise<Municipality> {
  
    const municipality = await repository.findById(id);
    
    if (!municipality) throw new MunicipalityNotFoundException(id); 
    
    return municipality;
    
}