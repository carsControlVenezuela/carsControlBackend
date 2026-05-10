import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';
import { BrandEntity } from '../../../../../../brand/infrastructure/database/psql/typeorm/entities/brand.typeorm.entity';

@Entity('model')
export class ModelEntity extends AuditTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @Column({ name: 'idBrand', type: 'uuid', nullable: false })
  idBrand!: string;

  @ManyToOne(() => BrandEntity)
  @JoinColumn({ name: 'idBrand' })
  brand!: BrandEntity;
}
