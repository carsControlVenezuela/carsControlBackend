import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRequestDto } from '../dtos/requests/vehicle.request.dto';
import { IModelRepository } from '../../../model/domain/repositories/iModel.repository';

export interface ICreateVehiclePort {
  execute(request: VehicleRequestDto, modelRepository: IModelRepository): Promise<Vehicle>;
}