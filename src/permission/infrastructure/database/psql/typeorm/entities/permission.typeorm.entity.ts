import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';

@Entity('permission')
export class PermissionEntity extends AuditTypeormEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
    name!: string;

    @Column({ name: 'resource', type: 'varchar', length: 100, nullable: true })
    resource!: string;

    @Column({ name: 'action', type: 'varchar', length: 50, nullable: false })
    action!: string;

    @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
    description!: string;
}