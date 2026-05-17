import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';

@Entity('vehicle_repair')
export class VehicleRepairEntity extends AuditTypeormEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', unique: true, type: 'varchar', length: 200, nullable: false })
    name!: string;

    @Column({ name: 'location', type: 'varchar', length: 300, nullable: false })
    location!: string;

    @Column({ name: 'phone', type: 'varchar', length: 14, nullable: true })
    phone?: string;

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
    email?: string;

    @Column({ name: 'photo', type: 'varchar', nullable: true })
    photo?: string;
    
}