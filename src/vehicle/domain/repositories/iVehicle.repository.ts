import { Vehicle } from '../entities/vehicle.entity';

export interface IVehicleRepository {
  save(vehicle: Vehicle): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | null>;
  findByPerson(idPerson: string): Promise<Vehicle[]>;
  findByPlate(plate: string): Promise<Vehicle | null>;
  update(vehicle: Vehicle): Promise<void>;
  delete(id: string): Promise<void>;
}