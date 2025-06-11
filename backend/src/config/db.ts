import { Pool } from 'pg';

export const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'capilla',
  password: 'root',
  port: 5432,
});
