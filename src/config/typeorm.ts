import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({ path: './env' });

const typeOrmConfig = {
  type: 'postgres',
  database: 'learn-ecommerce-db',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  entities: [ 'dist/**/*.entity{.ts,.js}'],
  migrations: [ 'dist/migrations/*{.ts,.js}' ]
};

export default registerAs('typeorm', () => typeOrmConfig);

export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions);