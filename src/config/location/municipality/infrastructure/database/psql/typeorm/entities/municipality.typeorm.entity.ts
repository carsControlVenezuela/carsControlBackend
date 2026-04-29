import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditTypeormEntity } from "../../../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity";
import { StateEntity } from "../../../../../../state/infrastructure/database/psql/typeorm/entities/state.typeorm.entity";
import { ParishEntity } from "../../../../../../parish/infrastructure/database/psql/typeorm/entities/parish.typeorm.entity";

@Entity('municipality')
export class MunicipalityEntity extends AuditTypeormEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name!: string;
    
    @ManyToOne(
        () => StateEntity, state => state.municipalities,
        { nullable: false, onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'idState' })
    state!: StateEntity;

    @OneToMany(() => ParishEntity, parish => parish.municipality)
    parishes!: ParishEntity[];

}