export interface IFindAllActivePort<T> {
    execute(): Promise<T[]>;
}