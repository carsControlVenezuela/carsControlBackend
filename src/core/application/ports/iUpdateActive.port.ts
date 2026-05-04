export interface IUpdateActivePort {
    execute(id: string): Promise<void>
}