export interface IFindByNamePort<T> {
    execute(name: string): Promise<T | null>;
}