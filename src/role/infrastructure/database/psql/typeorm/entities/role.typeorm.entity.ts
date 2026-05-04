import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';
import { PermissionEntity } from '../../../../../../permission/infrastructure/database/psql/typeorm/entities/permission.typeorm.entity';

@Entity('role')
export class RoleEntity extends AuditTypeormEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 50, nullable: false, unique: true })
    name!: string;

    @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
    description!: string;

    @ManyToMany(() => PermissionEntity, { eager: true })
    @JoinTable({
        name: 'permission_role',
        joinColumn: { name: 'idRole', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'idPermission', referencedColumnName: 'id' }
    })
    permissions!: PermissionEntity[];
}