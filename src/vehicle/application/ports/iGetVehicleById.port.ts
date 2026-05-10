import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';

export interface IGetVehicleByIdPort {
  execute(id: string): Promise<VehicleResponseDto>;
}