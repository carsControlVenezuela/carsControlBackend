import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditTypeormEntity } from "../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity";

@Entity('vehicle')
export class VehicleEntity extends AuditTypeormEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name:'price', type:'float',nullable:true})
    price?: number;

    @Column({ name: 'startDate', type:'date',nullable:false })
    createdAt!: Date;
}