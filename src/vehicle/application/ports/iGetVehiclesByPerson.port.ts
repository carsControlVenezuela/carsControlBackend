import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';

export interface IGetVehiclesByPersonPort {
  execute(idPerson: string): Promise<VehicleResponseDto[]>;
}