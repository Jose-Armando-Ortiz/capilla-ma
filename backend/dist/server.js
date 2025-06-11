"use strict";
// import express, { Router } from "express";
// import http, { get } from "http"; 
// import session from "express-session";
// import pgSession from "connect-pg-simple";
// import { Pool } from "pg";
// import authRoutes from './routes/authRoutes'; 
// import cors from 'cors';
// import 'dotenv/config';
// import misasRouter from "./routes/misasRoutes";
// import eventosRouter from "./routes/eventosRoutes";
// const app = express();
// const port = process.env.PORT || 8080;
// const server = http.createServer(app);
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// //configuración de cors, express.json(), express.urlencoded
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Middleware para parsing 
// // configuración de postgres y sesiones
// const pgPool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'capilla',
//     password: 'root',
//     port: 5432,
// });
// const PostgrestsqlStore = pgSession(session);
// app.use(
//     session({
//         store: new PostgrestsqlStore({
//             pool: pgPool,
//             tableName: 'session'
//         }),
//         secret: 'Pyla2025#', 
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             secure: true, 
//             httpOnly: true,
//             maxAge: 1000 * 60 * 60 * 24,
//             sameSite: 'lax'
//         }
//     })
// );
// const router = Router();
// app.use('/api', router); 
// app.use('/api/misas', misasRouter); 
// app.use('/api/eventos',eventosRouter); 
// // Monta el router de autenticación (ya estaba bien)
// app.use('/auth', authRoutes);
// // Ruta de inicio
// app.get("/", (req, res) => {
//     res.send("Hola soy express con Typescript");
// });
// // Inicio del servidor
// app.listen(port, () => {
//     console.log(`Servidor está en puerto ${port}`);
// });
// // funciones shutdown y setInterval para sesiones
// const shutdown = () => {
//     console.log("Cerrando servidor...");
//     server.close(() => {
//         console.log("Servidor Express cerrado.");
//         process.exit(0);
//     });
// };
// //Para setear las sesiones cada hora
// setInterval(async () => {
//   try {
//     const result = await pgPool.query('DELETE FROM session WHERE expire < NOW()');
//     console.log(`${result.rowCount} sesiones expiradas eliminadas`);
//   } catch (error) {
//     console.error('Error limpiando sesiones:', error);
//   }
// }, 60 * 60 * 1000); 
// // Escucha la señal SIGINT (Ctrl+C)
// process.on("SIGINT", shutdown);
// process.on("SIGTERM", shutdown);
// process.on("uncaughtException", (err) => {
//     console.error("Excepción no capturada:", err);
//     shutdown();
// });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const port = process.env.PORT || 8080;
const server = http_1.default.createServer(app_1.default);
// Limpieza de sesiones expiradas cada hora
setInterval(async () => {
    try {
        const result = await db_1.pgPool.query('DELETE FROM session WHERE expire < NOW()');
        console.log(`${result.rowCount} sesiones expiradas eliminadas`);
    }
    catch (error) {
        console.error('Error limpiando sesiones:', error);
    }
}, 60 * 60 * 1000);
// Apagar servidor
const shutdown = () => {
    console.log("Cerrando servidor...");
    server.close(() => {
        console.log("Servidor cerrado correctamente");
        process.exit(0);
    });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", (err) => {
    console.error("Excepción no capturada:", err);
    shutdown();
});
// Iniciar
server.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
