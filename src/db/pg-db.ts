import { PoolConfig } from 'pg';
import { Pool } from 'pg';
import { config } from 'dotenv';
config();

const configs: PoolConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const pgPool = new Pool(configs);
