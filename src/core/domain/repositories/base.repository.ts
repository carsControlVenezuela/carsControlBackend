import { PaginatedResult, PaginationParams } from "../types/pagination.types";

export interface IBaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    findAllActive(): Promise<T[]>;
    findAllPaginated(params: PaginationParams): Promise<PaginatedResult<T>>;
    findAllActivePaginated(params: PaginationParams): Promise<PaginatedResult<T>>;
    findByName(name: string): Promise<T | null>;
    update(entity: T): Promise<T>;
}