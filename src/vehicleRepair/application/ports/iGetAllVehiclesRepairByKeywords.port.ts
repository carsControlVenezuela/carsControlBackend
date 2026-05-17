import { VehicleRepairResponseDto } from "../dtos/responses/vehicleRepair.response.dto";

export interface IGetAllVehiclesRepairByKeywordsPort {
    execute(keyword: string): Promise<VehicleRepairResponseDto[]>;
}