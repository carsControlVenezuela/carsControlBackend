import { DataSource } from 'typeorm';
import 'dotenv/config';
import { CountryEntity } from '../../config/location/country/infrastructure/database/psql/typeorm/entities/country.typeorm.entity';
import { StateEntity } from '../../config/location/state/infrastructure/database/psql/typeorm/entities/state.typeorm.entity';
import { UserEntity } from '../../user/infrastructure/database/psql/typeorm/entities/user.typeorm.entity';
import { RoleEntity } from '../../role/infrastructure/database/psql/typeorm/entities/role.typeorm.entity';
import { PermissionEntity } from '../../permission/infrastructure/database/psql/typeorm/entities/permission.typeorm.entity';
import { RefreshTokenEntity } from '../../auth/infrastructure/database/psql/typeorm/entities/refreshToken.typeorm.entity';
import { PersonEntity } from '../../person/infrastructure/database/psql/typeorm/entities/person.typeorm.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ssl: { rejectUnauthorized: false },
  entities: [
    CountryEntity,
    StateEntity,
    UserEntity,
    RoleEntity,
    PermissionEntity,
    RefreshTokenEntity,
    PersonEntity
  ],
  migrations: ['src/database/typeorm/migrations/*.ts'],
  synchronize: false,
  logging: ['error'],
});
