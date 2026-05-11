import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleNotFoundException } from '../../domain/exceptions/vehicleNotFound.exception';
import { IVehicleRepository } from '../../domain/repositories/iVehicle.repository';

export async function findVehicleOrFail(
  repository: IVehicleRepository,
  id: string,
): Promise<Vehicle> {
  const vehicle = await repository.findById(id);
  if (!vehicle) throw new VehicleNotFoundException(id);
  return vehicle;
}
