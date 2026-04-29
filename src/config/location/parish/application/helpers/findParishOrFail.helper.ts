import { Parish } from "../../domain/entities/parish.entity";
import { ParishNotFoundException } from "../../domain/exceptions/parishNotFound.exception";
import { IParishRepository } from "../../domain/repositories/iParish.repository";

export async function findParishOrFail(repository: IParishRepository, id: string): Promise<Parish> {
  
    const Parish = await repository.findById(id);
    
    if (!Parish) throw new ParishNotFoundException(id); 
    
    return Parish;
    
}