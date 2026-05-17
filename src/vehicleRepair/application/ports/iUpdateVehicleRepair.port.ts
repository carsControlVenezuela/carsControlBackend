import { UpdateVehicleRepairInputDto } from "../dtos/requests/updateVehicleRepair.request.dto";

export interface IUpdateVehicleRepairPort {
    execute(id: string, request: UpdateVehicleRepairInputDto): Promise<void>;
}