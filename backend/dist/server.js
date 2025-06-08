"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const http_1 = __importDefault(require("http"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = require("./database/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const SECRET_KEY = "pula2025";
const server = http_1.default.createServer(app);
//configuracion de cors
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
//config de postgres
const pgPool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'capilla',
    password: 'root',
    port: 5432,
});
const PostgrestsqlStore = (0, connect_pg_simple_1.default)(express_session_1.default);
//middleware para parsing
app.use(express_1.default.urlencoded({ extended: true }));
//configuraciones de sesiones
app.use((0, express_session_1.default)({
    store: new PostgrestsqlStore({
        pool: pgPool,
        tableName: 'session'
    }),
    secret: 'Pyla2025#',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax'
    }
}));
const router = (0, express_1.Router)();
router.get('/misas', async (req, res) => {
    try {
        const result = await db_1.pool.query('SELECT id, fecha, descripcion FROM misas ORDER BY fecha ASC');
        const rows = result.rows;
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las misas' });
    }
});
app.use('/auth', authRoutes_1.default);
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
    }
    catch (error) {
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
