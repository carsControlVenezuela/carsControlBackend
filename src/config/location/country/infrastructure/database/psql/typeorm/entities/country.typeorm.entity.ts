import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditTypeormEntity } from "../../../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity";
import { StateEntity } from "../../../../../../state/infrastructure/database/psql/typeorm/entities/state.typeorm.entity";

@Entity('country')
export class CountryEntity extends AuditTypeormEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name!: string;

    @OneToMany(() => StateEntity, state => state.country)
    states!: StateEntity[];
}