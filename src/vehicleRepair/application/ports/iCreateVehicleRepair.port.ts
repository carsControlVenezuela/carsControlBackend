import { CreateVehicleRepairInputDto } from "../dtos/requests/createVehicleRepair.request.dto";

export interface ICreateVehicleRepairPort {
    execute(request: CreateVehicleRepairInputDto): Promise<void>;
}