import { UpdateVehicleRequestDto } from '../dtos/requests/updateVehicle.request.dto';
import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';

export interface IUpdateVehiclePort {
  execute(id: string, request: UpdateVehicleRequestDto): Promise<VehicleResponseDto>;
}