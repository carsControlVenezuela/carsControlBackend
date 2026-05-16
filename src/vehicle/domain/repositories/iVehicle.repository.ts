import { IBaseRepository } from '../../../core/domain/repositories/base.repository';
import { Vehicle } from '../entities/vehicle.entity';

export interface IVehicleRepository extends IBaseRepository<Vehicle> {
  save(vehicle: Vehicle): Promise<Vehicle>;
  findByPerson(idPerson: string): Promise<Vehicle[]>;
  findByPlate(plate: string): Promise<Vehicle | null>;
}
