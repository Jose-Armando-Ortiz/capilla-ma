"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pg_1 = require("pg");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const pgPool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'capilla',
    password: 'root',
    port: 5432,
});
// POST /auth/register - Registrar usuario
router.post('/register', auth_1.requireGuest, async (req, res) => {
    try {
        const { email, password, nombre } = req.body;
        // Validaciones básicas
        if (!email || !password) {
            res.status(400).json({
                error: 'Email y contraseña son requeridos a'
            });
            return;
        }
        // Verificar si el usuario ya existe
        const userExists = await pgPool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            res.status(400).json({
                error: 'El usuario ya existe'
            });
            return;
        }
        // Hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Insertar nuevo usuario
        const result = await pgPool.query('INSERT INTO users (email, password, nombre) VALUES ($1, $2, $3) RETURNING id, email, nombre', [email, hashedPassword, nombre || null]);
        const newUser = result.rows[0];
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: newUser.id,
                email: newUser.email,
                nombre: newUser.nombre
            }
        });
    }
    catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
//post login iniciar sesion
router.post('/login', auth_1.requireGuest, async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                error: 'Email y contraseña son requeridos b'
            });
            return;
        }
        //buscar  el usuario en la base de dsatos
        const result = await pgPool.query('SELECT id,email,password,nombre FROM users WHERE email=$1', [email]);
        if (result.rows.length === 0) {
            res.status(401).json({
                error: 'Credenciales invalidas porfavor ingrese un email y suario correcto'
            });
            return;
        }
        const user = result.rows[0];
        //verificacion de la conrasenha
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({
                error: 'credenciales invalidas'
            });
            return;
        }
        // crear la sesion
        req.session.userId = user.id;
        req.session.user = {
            id: user.id,
            email: user.email,
            nombre: user.nombre || undefined
        };
        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre
            }
        });
    }
    catch (error) {
        console.log('Error en el login: ', error);
        res.status(500).json({
            error: 'Error interno en el servidor aca es....'
        });
    }
});
router.post('/logout', auth_1.requireAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: 'Error al cerrar sesión' });
            return;
        }
        res.clearCookie('connect.sid'); // Limpiar cookie de sesión
        res.json({ message: 'Sesión cerrada exitosamente' });
    });
});
// GET /auth/me - Obtener usuario actual
router.get('/me', auth_1.requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const result = await pgPool.query('SELECT id, email, nombre FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        const user = result.rows[0];
        res.json({
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre
            }
        });
    }
    catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.default = router;
