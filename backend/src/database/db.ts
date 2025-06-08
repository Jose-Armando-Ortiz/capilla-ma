
import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'root',
  database: 'capilla',
  port: 5432,
});
