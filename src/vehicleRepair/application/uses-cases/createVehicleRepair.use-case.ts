import { IVehicleRepairRepository } from "../../domain/repositories/iVehicleRepair.repository";
import { CreateVehicleRepairInputDto } from "../dtos/requests/createVehicleRepair.request.dto";
import { existVehicleRepairByName } from "../helpers/existVehicleRepairByName.helper";
import { VehicleRepairMapper } from "../mappers/vehicleRepair.mapper";
import { ICreateVehicleRepairPort } from "../ports/iCreateVehicleRepair.port";

export class CreateVehicleRepairUseCase implements ICreateVehicleRepairPort {

    constructor(private readonly repository: IVehicleRepairRepository) {}

    async execute(dto: CreateVehicleRepairInputDto): Promise<void> {

        await existVehicleRepairByName(this.repository, dto.name);

        await this.repository.save(VehicleRepairMapper.toDomain(dto));
        
    }
    
}