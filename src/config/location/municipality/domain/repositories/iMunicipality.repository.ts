import { IBaseRepository } from "../../../../../core/domain/repositories/base.repository";
import { Municipality } from "../entities/municipality.entity";

export interface IMunicipalityRepository extends IBaseRepository<Municipality> {
    save(entity: Municipality): Promise<void>;
    findAllByKeywords(name: string): Promise<Municipality[]>
}