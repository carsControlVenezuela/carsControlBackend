import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditTypeormEntity } from "../../../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity";
import { CountryEntity } from "../../../../../../country/infrastructure/database/psql/typeorm/entities/country.typeorm.entity";

@Entity('state')
export class StateEntity extends AuditTypeormEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name!: string;
    
    @ManyToOne(
        () => CountryEntity, country => country.states,
        { nullable: false, onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'idCountry' })
    country!: CountryEntity;
}