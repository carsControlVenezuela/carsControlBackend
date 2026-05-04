export interface IFindByIdPort<TResponse> {
  execute(id: string): Promise<TResponse>;
}