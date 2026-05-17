import { findByIdOrFail } from "../../../core/application/helpers/findByIdOrFail.helper";
import { VehicleRepairAlreadyExistsException } from "../../domain/exceptions/vehicleRepairAlreadyExists.exception";
import { IVehicleRepairRepository } from "../../domain/repositories/iVehicleRepair.repository";
import { UpdateVehicleRepairInputDto } from "../dtos/requests/updateVehicleRepair.request.dto";
import { VehicleRepairMapper } from "../mappers/vehicleRepair.mapper";
import { IUpdateVehicleRepairPort } from "../ports/iUpdateVehicleRepair.port";

export class UpdateVehicleRepairUseCase implements IUpdateVehicleRepairPort {

    constructor(private readonly repository: IVehicleRepairRepository) {}

    async execute(id: string, dto: UpdateVehicleRepairInputDto): Promise<void> {

        const vehicleRepair = await findByIdOrFail(this.repository, id, 'Taller');

        if (dto.name && dto.name !== vehicleRepair.getName) {

        const exists = await this.repository.findByName(dto.name);

            if (exists) {
                throw new VehicleRepairAlreadyExistsException(dto.name);
            }
        
        }

        VehicleRepairMapper.merge(vehicleRepair, dto);

        await this.repository.update(vehicleRepair);

    }
}