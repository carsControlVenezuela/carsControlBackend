import { IBaseRepository } from "../../../core/domain/repositories/base.repository";
import { VehicleRepair } from "../../domain/entities/vehicleRepair.entity";
import { VehicleRepairAlreadyExistsException } from "../../domain/exceptions/vehicleRepairAlreadyExists.exception";

export async function existVehicleRepairByName(repository: IBaseRepository<VehicleRepair>, name: string): Promise<void> {
    const exists = await repository.findByName(name);
    if (exists) throw new VehicleRepairAlreadyExistsException(name);
}