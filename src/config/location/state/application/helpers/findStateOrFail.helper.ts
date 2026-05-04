import { State } from "../../domain/entities/state.entity";
import { StateNotFoundException } from "../../domain/exceptions/stateNotFound.exception";
import { IStateRepository } from "../../domain/repositories/iState.repository";

export async function findStateOrFail(repository: IStateRepository, id: string): Promise<State> {
  
    const state = await repository.findById(id);
    
    if (!state) throw new StateNotFoundException(id); 
    
    return state;
    
}