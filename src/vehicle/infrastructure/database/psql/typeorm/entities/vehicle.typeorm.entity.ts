import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';
import { ModelEntity } from '../../../../../../config/vehicle/model/infrastructure/database/psql/typeorm/entities/model.typeorm.entity';

@Entity('vehicle')
export class VehicleEntity extends AuditTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'idPerson', type: 'uuid', nullable: false })
  idPerson!: string;

  @Column({ name: 'year', type: 'date', nullable: false })
  year!: Date;

  @Column({ name: 'color', type: 'varchar', nullable: false })
  color!: string;

  @Column({ name: 'purchaseDate', type: 'date', nullable: false })
  purchaseDate!: Date;

  @Column({ name: 'plate', type: 'varchar', nullable: false, unique: true })
  plate!: string;

  @Column({ name: 'mileage', type: 'double precision', nullable: false })
  mileage!: number;

  @Column({ name: 'idModel', type: 'uuid', nullable: false })
  idModel!: string;

  @ManyToOne(() => ModelEntity)
  @JoinColumn({ name: 'idModel' })
  model!: ModelEntity;
}
