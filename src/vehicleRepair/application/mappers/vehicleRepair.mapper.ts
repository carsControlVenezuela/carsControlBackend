import { VehicleRepair } from "../../domain/entities/vehicleRepair.entity";
import { CreateVehicleRepairInputDto } from "../dtos/requests/createVehicleRepair.request.dto";
import { UpdateVehicleRepairInputDto } from "../dtos/requests/updateVehicleRepair.request.dto";
import { VehicleRepairResponseDto } from "../dtos/responses/vehicleRepair.response.dto";

export class VehicleRepairMapper {

    static toResponse(vehicleRepair: VehicleRepair): VehicleRepairResponseDto {
        
        if (!vehicleRepair.getId) throw new Error('Taller sin id no puede ser mapeado');

        return {
            id: vehicleRepair.getId,
            name: vehicleRepair.getName,
            location: vehicleRepair.getLocation,
            phone: vehicleRepair.getPhone,
            email: vehicleRepair.getEmail,
            photo: vehicleRepair.getPhoto,
            active: vehicleRepair.active,
            createdAt: vehicleRepair.createdAt,
            updatedAt: vehicleRepair.updatedAt
        };

    }

    static toDomain(dto: CreateVehicleRepairInputDto): VehicleRepair {
        return new VehicleRepair(dto.name, dto.location, dto.phone, dto.email, dto.photo);
    }

    static merge(existing: VehicleRepair, dto: UpdateVehicleRepairInputDto): VehicleRepair {
        if (dto.name) existing.setName = dto.name;
        if (dto.location) existing.setLocation = dto.location;
        if (dto.phone) existing.setPhone = dto.phone;
        if (dto.email) existing.setEmail = dto.email;
        if (dto.photo) existing.setPhoto = dto.photo;
        return existing;
    }
}