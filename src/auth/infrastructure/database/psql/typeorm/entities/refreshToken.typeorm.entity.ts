import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../../../../user/infrastructure/database/psql/typeorm/entities/user.typeorm.entity';

@Entity('refresh_token')
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    token!: string;

    @Column({ name: 'expires_at' })
    expiresAt!: Date;

    @Column({ name: 'idUser' })
    idUser!: string;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user!: UserEntity;
}