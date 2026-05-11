import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleResponseDto } from '../dtos/responses/vehicle.response.dto';
import { UpdateVehicleRequestDto } from '../dtos/requests/updateVehicle.request.dto';
import { VehicleRequestDto } from '../dtos/requests/vehicle.request.dto';

export class VehicleMapper {
  static toDomain(entity: VehicleRequestDto): Vehicle {
    return new Vehicle(
      entity.idPerson,
      entity.idModel,
      new Date(entity.year),
      entity.color,
      new Date(entity.purchaseDate),
      entity.plate,
      entity.mileage,
    );
  }

  static toResponse(vehicle: Vehicle): VehicleResponseDto {
    return {
      id: vehicle.id,
      idPerson: vehicle.idPerson,
      idModel: vehicle.idModel,
      year: vehicle.year,
      color: vehicle.color,
      purchaseDate: vehicle.purchaseDate,
      plate: vehicle.plate,
      mileage: vehicle.mileage,
      active: vehicle.active,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }

  static merge(existing: Vehicle, dto: UpdateVehicleRequestDto): Vehicle {
    if (dto.color !== undefined) existing.color = dto.color;
    if (dto.mileage !== undefined) existing.mileage = dto.mileage;
    if (dto.plate !== undefined) existing.plate = dto.plate;
    return existing;
  }
}
