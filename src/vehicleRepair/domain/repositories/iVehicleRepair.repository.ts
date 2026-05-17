import { IBaseRepository } from "../../../core/domain/repositories/base.repository";
import { VehicleRepair } from "../entities/vehicleRepair.entity";

export interface IVehicleRepairRepository extends IBaseRepository<VehicleRepair>{
    save(vehicleRepair: VehicleRepair): Promise<void>;
    findAllByKeywords(name: string): Promise<VehicleRepair[]>
}