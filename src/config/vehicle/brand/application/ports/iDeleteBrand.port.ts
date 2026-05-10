export interface IDeleteBrandPort {
  execute(id: string): Promise<void>;
}