import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRequestDto } from '../dtos/requests/vehicle.request.dto';

export interface ICreateVehiclePort {
  execute(request: VehicleRequestDto): Promise<Vehicle>;
}