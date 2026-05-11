import { DeepPartial } from 'typeorm';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { VehicleEntity } from '../../database/psql/typeorm/entities/vehicle.typeorm.entity';

export class VehicleTypeormMapper {
  static toDomain(entity: VehicleEntity): Vehicle {
    return new Vehicle(
      entity.idPerson,
      entity.idModel,
      entity.year,
      entity.color,
      entity.purchaseDate,
      entity.plate,
      entity.mileage,
      entity.id,
      entity.createdAt,
      entity.updatedAt,
      entity.active,
      entity.createdBy,
      entity.updatedBy,
    );
  }

  static toPersistence(vehicle: Vehicle): DeepPartial<VehicleEntity> {
    return {
      ...(vehicle.id && { id: vehicle.id }),
      idPerson: vehicle.idPerson,
      idModel: vehicle.idModel,
      year: vehicle.year,
      color: vehicle.color,
      purchaseDate: vehicle.purchaseDate,
      plate: vehicle.plate,
      mileage: vehicle.mileage,
      active: vehicle.active,
    };
  }
}