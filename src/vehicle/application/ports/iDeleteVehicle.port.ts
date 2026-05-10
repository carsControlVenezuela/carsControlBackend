export interface IDeleteVehiclePort {
  execute(id: string): Promise<void>;
}