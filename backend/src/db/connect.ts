import pg from "pg";

import { config } from "dotenv";

config();

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
