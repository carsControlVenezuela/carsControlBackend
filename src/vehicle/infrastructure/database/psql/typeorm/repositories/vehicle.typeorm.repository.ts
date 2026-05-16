import { DeepPartial, Repository } from 'typeorm';
import { Vehicle } from '../../../../../domain/entities/vehicle.entity';
import { IVehicleRepository } from '../../../../../domain/repositories/iVehicle.repository';
import { BaseTypeormRepository } from '../../../../../../core/infrastructure/database/repositories/base.repository';
import { VehicleEntity } from '../entities/vehicle.typeorm.entity';
import { VehicleTypeormMapper } from '../../../../http/mappers/vehicle.http.mapper';

export class VehicleTypeormRepository extends BaseTypeormRepository<Vehicle, VehicleEntity> implements IVehicleRepository {

  constructor(repo: Repository<VehicleEntity>) {
    super(repo);
  }

  protected toDomain(entity: VehicleEntity): Vehicle {
    return VehicleTypeormMapper.toDomain(entity);
  }

  protected toPersistence(vehicle: Vehicle): DeepPartial<VehicleEntity> {
    return VehicleTypeormMapper.toPersistence(vehicle);
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const saved = await this.repo.save(this.repo.create(VehicleTypeormMapper.toPersistence(vehicle)));
    return VehicleTypeormMapper.toDomain(saved);
  }

  async findByPerson(idPerson: string): Promise<Vehicle[]> {
    const entities = await this.repo.find({ where: { idPerson } });
    return entities.map(e => VehicleTypeormMapper.toDomain(e));
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const entity = await this.repo
      .createQueryBuilder('vehicle')
      .where('LOWER(vehicle.plate) = LOWER(:plate)', { plate })
      .getOne();
    return entity ? VehicleTypeormMapper.toDomain(entity) : null;
  }

}
