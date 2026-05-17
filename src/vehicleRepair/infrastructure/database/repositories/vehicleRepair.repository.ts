import { Repository } from 'typeorm';
import { BaseTypeormRepository } from '../../../../core/infrastructure/database/repositories/base.repository';
import { DeepPartial } from 'typeorm';
import { VehicleRepair } from '../../../domain/entities/vehicleRepair.entity';
import { VehicleRepairEntity } from '../psql/typeorm/entities/vehicleRepair.typeorm.entity';
import { VehicleRepairTypeormMapper } from '../../http/mappers/vehicleRepair.http.mapper';
import { IVehicleRepairRepository } from '../../../domain/repositories/iVehicleRepair.repository';

export class VehicleRepairTypeormRepository extends BaseTypeormRepository<VehicleRepair, VehicleRepairEntity> implements IVehicleRepairRepository {

    constructor(repo: Repository<VehicleRepairEntity>) {
        super(repo);
    }

    protected toDomain(entity: VehicleRepairEntity): VehicleRepair {
        return VehicleRepairTypeormMapper.toDomain(entity);
    }

    protected toPersistence(vr: VehicleRepair): DeepPartial<VehicleRepairEntity> {
        return VehicleRepairTypeormMapper.toPersistence(vr);
    }

    async save(vehicleRepair: VehicleRepair): Promise<void> {
        await this.repo.save(this.repo.create(VehicleRepairTypeormMapper.toPersistence(vehicleRepair)));
    }

    async findAllByKeywords(name: string): Promise<VehicleRepair[]> {

        const entities = await this.repo
            .createQueryBuilder('vehicle_repair')
            .where('LOWER("vehicle_repair".name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        return entities.map(VehicleRepairTypeormMapper.toDomain);
    }
    
}