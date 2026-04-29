import { DataSource } from 'typeorm';
import 'dotenv/config';
import { CountryEntity } from '../../config/location/country/infrastructure/database/psql/typeorm/entities/country.typeorm.entity';
import { StateEntity } from '../../config/location/state/infrastructure/database/psql/typeorm/entities/state.typeorm.entity';
import { MunicipalityEntity } from '../../config/location/municipality/infrastructure/database/psql/typeorm/entities/municipality.typeorm.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  entities: [
    CountryEntity,
    StateEntity,
    MunicipalityEntity,
  ],
  migrations: ['src/database/typeorm/migrations/*.ts'],
  synchronize: true,
  logging: ['error']
});