import { IBaseRepository } from "../../../../../core/domain/repositories/base.repository";
import { State } from "../entities/state.entity";

export interface IStateRepository extends IBaseRepository<State> {
    save(entity: State): Promise<void>;
    findAllByKeywords(name: string): Promise<State[]>
    findByCountry(countryId: string): Promise<State[]>;
}