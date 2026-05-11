import { PersonAlreadyExistsException } from "../../domain/exceptions/personAlreadyExists.exception";
import { IPersonRepository } from "../../domain/repositories/iPerson.repository";

export async function findPersonByCedulaOrFail(repository: IPersonRepository, cedula: string): Promise<void> {
  
    const person = await repository.findByCedula(cedula);
    
    if (person) throw new PersonAlreadyExistsException(cedula); 
        
}