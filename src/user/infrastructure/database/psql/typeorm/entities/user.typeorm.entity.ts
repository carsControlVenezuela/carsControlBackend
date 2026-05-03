import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';
import { RoleEntity } from '../../../../../../role/infrastructure/database/psql/typeorm/entities/role.typeorm.entity';

@Entity('user')
export class UserEntity extends AuditTypeormEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @ManyToMany(() => RoleEntity, { eager: true })
    @JoinTable({
        name: 'user_role',
        joinColumn: { name: 'idUser', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'idRole', referencedColumnName: 'id' }
    })
    roles!: RoleEntity[];
}