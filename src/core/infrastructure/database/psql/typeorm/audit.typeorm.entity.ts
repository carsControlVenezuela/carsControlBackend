import { CreateDateColumn, UpdateDateColumn, Column, BaseEntity } from 'typeorm';

export abstract class AuditTypeormEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt!: Date;

  @Column({ name: 'active', default: true, nullable: false })
  active!: boolean;

  @Column({ name: 'created_by', nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;
}
