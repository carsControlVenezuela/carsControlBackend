import { IBaseRepository } from "../../../../../core/domain/repositories/base.repository";
import { Parish } from "../entities/parish.entity";

export interface IParishRepository extends IBaseRepository<Parish> {
    save(entity: Parish): Promise<void>;
    findAllByKeywords(name: string): Promise<Parish[]>
}