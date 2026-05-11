import { DeepPartial } from 'typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../../database/typeorm/typeorm.config';
import { Vehicle } from '../../../../../domain/entities/vehicle.entity';
import { IVehicleRepository } from '../../../../../domain/repositories/iVehicle.repository';
import { VehicleEntity } from '../entities/vehicle.typeorm.entity';
import { VehicleTypeormMapper } from '../../../../http/mappers/vehicle.http.mapper';

export class VehicleTypeormRepository implements IVehicleRepository {
  private readonly repository: Repository<VehicleEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(VehicleEntity);
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const entity = this.toPersistence(vehicle);
    const saved = await this.repository.save(entity as VehicleEntity);
    return VehicleTypeormMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? VehicleTypeormMapper.toDomain(entity) : null;
  }

  async findByPerson(idPerson: string): Promise<Vehicle[]> {
    const entities = await this.repository.find({ where: { idPerson } });
    return entities.map(VehicleTypeormMapper.toDomain);
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const entity = await this.repository
      .createQueryBuilder('vehicle')
      .where('LOWER(vehicle.plate) = LOWER(:plate)', { plate })
      .getOne();
    return entity ? VehicleTypeormMapper.toDomain(entity) : null;
  }

  async update(vehicle: Vehicle): Promise<void> {
    const entity = this.toPersistence(vehicle);
    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  private toPersistence(vehicle: Vehicle): DeepPartial<VehicleEntity> {
    return {
      id: vehicle.id,
      idPerson: vehicle.idPerson,
      idModel: vehicle.idModel,
      year: vehicle.year,
      color: vehicle.color,
      purchaseDate: vehicle.purchaseDate,
      plate: vehicle.plate,
      mileage: vehicle.mileage,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
      active: vehicle.active,
      createdBy: vehicle.createdBy,
      updatedBy: vehicle.updatedBy,
    };
  }
}
