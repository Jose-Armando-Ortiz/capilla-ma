import session from "express-session";
import pgSession from "connect-pg-simple";
import { pgPool } from "./db";

const PostgresStore = pgSession(session);

export const sessionMiddleware = session({
  store: new PostgresStore({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: 'Pyla2025#',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax',
  },
});
