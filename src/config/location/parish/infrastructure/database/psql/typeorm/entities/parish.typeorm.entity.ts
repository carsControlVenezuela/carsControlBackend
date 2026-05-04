import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditTypeormEntity } from "../../../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity";
import { MunicipalityEntity } from "../../../../../../municipality/infrastructure/database/psql/typeorm/entities/municipality.typeorm.entity";

@Entity('parish')
export class ParishEntity extends AuditTypeormEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name!: string;
    
    @ManyToOne(
        () => MunicipalityEntity, manicipality => manicipality.parishes,
        { nullable: false, onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'idMunicipality' })
    municipality!: MunicipalityEntity;
}