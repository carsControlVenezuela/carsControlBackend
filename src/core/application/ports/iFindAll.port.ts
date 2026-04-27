export interface IFindAllPort<TResponse> {
  execute(): Promise<TResponse[]>;
}