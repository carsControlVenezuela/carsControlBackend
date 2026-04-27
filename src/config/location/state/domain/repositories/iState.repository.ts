import { State } from "../entities/state.entity";

export interface IStateRepository {
    findById(id: string): Promise<State | null>;
    findAll(): Promise<State[]>;
    findAllActive(): Promise<State[]>;
    findByName(name: string): Promise<State | null>;
    findAllByKeywords(keyword: string): Promise<State[]>;
    save(state: State): Promise<State>;
    update(state: State): Promise<State>;
}