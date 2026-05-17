import { DeepPartial } from 'typeorm';
import { VehicleRepairEntity } from '../../database/psql/typeorm/entities/vehicleRepair.typeorm.entity';
import { VehicleRepair } from '../../../domain/entities/vehicleRepair.entity';

export class VehicleRepairTypeormMapper {

    static toDomain(entity: VehicleRepairEntity): VehicleRepair {
        return new VehicleRepair(
            entity.name,
            entity.location,
            entity.phone,
            entity.email,
            entity.photo,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    static toPersistence(vehicleRepair: VehicleRepair): DeepPartial<VehicleRepairEntity> {
        return {
            ...(vehicleRepair.getId && { id: vehicleRepair.getId }),
            name: vehicleRepair.getName,
            location: vehicleRepair.getLocation,
            phone: vehicleRepair.getPhone,
            email: vehicleRepair.getEmail,
            photo: vehicleRepair.getPhoto,
            active: vehicleRepair.active,
            updatedAt: vehicleRepair.updatedAt
        };
    }
}