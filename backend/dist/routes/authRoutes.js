"use strict";
// import express, { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import { Pool } from 'pg';
// import { requireAuth, requireGuest } from '../middleware/auth';
// import { error } from 'console';
// import type {UserProps} from '../types/auth';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const pgPool = new Pool({
//   user: 'postgres',
//   host: 'localhost', 
//   database: 'capilla',
//   password: 'root',
//   port: 5432,
// });
// // POST /auth/register - Registrar usuario
// router.post('/register', requireGuest, async (req: Request, res: Response): Promise<void> => {
//   try {
// const { email, password, nombre } = req.body;
//     // Validaciones básicas
//     if (!email || !password) {
//       res.status(400).json({ 
//         error: 'Email y contraseña son requeridos a' 
//       });
//       return;
//     }
//     // Verificar si el usuario ya existe
//     const userExists = await pgPool.query(
//       'SELECT id FROM users WHERE email = $1', 
//       [email]
//     );
//     if (userExists.rows.length > 0) {
//       res.status(400).json({ 
//         error: 'El usuario ya existe' 
//       });
//       return;
//     }
//     // Hash de la contraseña
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     // Insertar nuevo usuario
//     const result = await pgPool.query(
//       'INSERT INTO users (email, password, nombre) VALUES ($1, $2, $3) RETURNING id, email, nombre',
//       [email, hashedPassword, nombre || null]
//     );
//     type user ={
//         id:string,
//         email:string,
//         nombre:string
//     }
//     const newUser:user = result.rows[0];
//     res.status(201).json({
//       message: 'Usuario registrado exitosamente',
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         nombre: newUser.nombre
//       }
//     });
//   } catch (error) {
//     console.error('Error en registro:', error);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// });
// //post login iniciar sesion
// router.post('/login',requireGuest,async(req : Request,res:Response):Promise <void>=>
// { 
//     try{
//         const {email,password}=req.body;
//         if (!email||!password){
//             res.status(400).json({
//                 error:'Email y contraseña son requeridos b'
//             })
//             return;
//         }
//         //buscar  el usuario en la base de dsatos
//         const result =await pgPool.query('SELECT id,email,password,nombre FROM users WHERE email=$1',
//         [email]);
//         if(result.rows.length===0){
//             res.status(401).json({
//                 error:'Credenciales invalidas porfavor ingrese un email y suario correcto'
//             });
//             return;
//         }
//         const user:UserProps=result.rows[0];
//         //verificacion de la conrasenha
//         const isValidPassword=await bcrypt.compare(password,user.password);
//         if(!isValidPassword){
//             res.status(401).json({
//                 error:'credenciales invalidas'
//             });
//             return;
//         }
// // crear la sesion
// req.session.userId=user.id;
// req.session.user={
//     id:user.id,
//     email:user.email,
//     nombre:user.nombre || undefined
// };
// res.json({
//     message:'Login exitoso',
//     user:{
//         id:user.id,
//         email:user.email,
//         nombre:user.nombre
//     }
// })
//     }catch(error){
//         console.log('Error en el login: ',error);
//         res.status(500).json({
//             error:'Error interno en el servidor aca es....'
//         });
//     }
// })
// router.post('/logout', requireAuth, (req: Request, res: Response): void => {
//   req.session.destroy((err) => {
//     if (err) {
//       res.status(500).json({ error: 'Error al cerrar sesión' });
//       return;
//     }
//     res.clearCookie('connect.sid'); // Limpiar cookie de sesión
//     res.json({ message: 'Sesión cerrada exitosamente' });
//   });
// });
// // GET /auth/me - Obtener usuario actual
// router.get('/me', requireAuth, async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.session.userId;
//     const result = await pgPool.query(
//       'SELECT id, email, nombre FROM users WHERE id = $1',
//       [userId]
//     );
//     if (result.rows.length === 0) {
//       res.status(404).json({ error: 'Usuario no encontrado' });
//       return;
//     }
//     const user = result.rows[0];
//     res.json({
//       user: {
//         id: user.id,
//         email: user.email,
//         nombre: user.nombre
//       }
//     });
//   } catch (error) {
//     console.error('Error al obtener usuario:', error);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// });
// // para mandar la info de misas en la pagina de home (app.tsx)
// // router.get('/api/misas',async (req: Request, res: Response) :Promise <void> => {
// // try{  
// //   const result =await pgPool.query(
// //     'SELECT * FROM misas ORDER BY id DESC LIMIT 5;',);
// //     const misas =result.rows; 
// //  res.status(200).json(misas);
// // }catch (error) {
// //   console.error('Error al obtener misas:', error);
// //   res.status(500).json({ error: 'Error interno del servidor' });
// // }
// // });
// export default router;
// src/routes/auth.routes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', auth_1.requireGuest, authController_1.register);
router.post('/login', auth_1.requireGuest, authController_1.login);
router.post('/logout', auth_1.requireAuth, authController_1.logout);
router.get('/me', auth_1.requireAuth, authController_1.me);
exports.default = router;
