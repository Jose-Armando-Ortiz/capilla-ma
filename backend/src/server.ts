import express, { Router } from "express";
import http, { get } from "http";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import 'dotenv/config';
import  {pool } from "./database/db";

const app = express();
const port = process.env.PORT || 8080;
const SECRET_KEY="pula2025";
const server = http.createServer(app);

//configuracion de cors
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json());


//config de postgres
const pgPool=new Pool({
  user:'postgres',
  host:'localhost',
  database:'capilla',
  password:'root',
  port:5432,

});
const PostgrestsqlStore= pgSession(session);

//middleware para parsing
app.use(express.urlencoded({ extended: true }));

//configuraciones de sesiones
app.use(
  session({
    store:new PostgrestsqlStore({
      pool:pgPool,
      tableName:'session'
    }),
    secret: 'Pyla2025#',
  resave: false,
  saveUninitialized: false,
    cookie:{
      secure:false,
      httpOnly:true,
      maxAge:1000 * 60 * 60 * 24,
      sameSite: 'lax'
    }
  })
);

const router = Router();


router.get('/misas', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, fecha, descripcion FROM misas ORDER BY fecha ASC');
    const rows=result.rows;
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las misas' });
  }
});
app.use('/auth',authRoutes);

app.get("/", (req, res) => {
  res.send("Hola soy express con Typescript");
});
app.listen(port, () => {
  console.log(`Servidor esta en puerto ${port}`);
});
const shutdown = () => {
  console.log("Cerrando servidor...");
  server.close(() => {
    console.log("Servidor Express cerrado.");
    
    process.exit(0);
  });
};

//Para setear las sesiones cada hora
setInterval(async () => {
  try {
    const result = await pgPool.query('DELETE FROM session WHERE expire < NOW()');
    console.log(`${result.rowCount} sesiones expiradas eliminadas`);
  } catch (error) {
    console.error('Error limpiando sesiones:', error);
  }
}, 60 * 60 * 1000); 

// Escucha la señal SIGINT (Ctrl+C)
process.on("SIGINT", shutdown);

// Escucha la señal SIGTERM (enviada por orquestadores como Docker, Kubernetes)
process.on("SIGTERM", shutdown);

process.on("uncaughtException", (err) => {
  console.error("Excepción no capturada:", err);
  shutdown();  
});
