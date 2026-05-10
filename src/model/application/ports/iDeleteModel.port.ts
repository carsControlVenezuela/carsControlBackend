export interface IDeleteModelPort {
  execute(id: string): Promise<void>;
}