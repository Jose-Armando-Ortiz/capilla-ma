// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pgPool } from '../config/db';
import { UserProps } from '../types/auth';

// REGISTER
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, nombre } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña requeridos' });
      return;
    }

    const userExists = await pgPool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      res.status(400).json({ error: 'El usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pgPool.query(
      'INSERT INTO users (email, password, nombre) VALUES ($1, $2, $3) RETURNING id, email, nombre',
      [email, hashedPassword, nombre || null]
    );

    const newUser = result.rows[0];
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: newUser,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// LOGIN
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña requeridos' });
      return;
    }

    const result = await pgPool.query(
      'SELECT id, email, password, nombre FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const user: UserProps = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    req.session.userId = user.id;
    req.session.user = {
      id: user.id,
      email: user.email,
      nombre: user.nombre || undefined,
    };

    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// LOGOUT
export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
      return;
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Sesión cerrada exitosamente' });
  });
};

// GET /me
export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.session.userId;
    const result = await pgPool.query('SELECT id, email, nombre FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
