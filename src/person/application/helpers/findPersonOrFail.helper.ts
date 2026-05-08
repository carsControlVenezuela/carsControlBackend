import { Person } from "../../domain/entities/person.entity";
import { PersonNotFoundException } from "../../domain/exceptions/personNotFound.exception";
import { IPersonRepository } from "../../domain/repositories/iPerson.repository";

export async function findPersonOrFail(repository: IPersonRepository, id: string): Promise<Person> {
  
    const person = await repository.findById(id);
    
    if (!person) throw new PersonNotFoundException(id); 
    
    return person;
    
}