import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../../../../user/infrastructure/database/psql/typeorm/entities/user.typeorm.entity';
import { AuditTypeormEntity } from '../../../../../../core/infrastructure/database/psql/typeorm/audit.typeorm.entity';

@Entity('person')
export class PersonEntity extends AuditTypeormEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    cedula!: string;

    @Column({ name: 'first_name', nullable: false })
    firstName!: string;

    @Column({ name: 'last_name', nullable: false })
    lastName!: string;

    @Column({ type: 'date', nullable: false })
    birthday!: Date;

    @Column({ type: 'varchar', nullable: false })
    gender!: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ name: 'middle_name', nullable: true })
    middleName?: string;

    @Column({ name: 'second_name', nullable: true })
    secondName?: string;

    @Column({ name: 'idUser', nullable: false })
    idUser!: string;

    @OneToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user!: UserEntity;

    //FALTA ZONA POSTAL
    // @ManyToOne(() => CountryEntity)
    // @JoinColumn({ name: 'id_country' })
    // country!: CountryEntity;
}