export interface IBaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    findAllActive(): Promise<T[]>;
    findByName(name: string): Promise<T | null>;
    update(entity: T): Promise<T>;
}