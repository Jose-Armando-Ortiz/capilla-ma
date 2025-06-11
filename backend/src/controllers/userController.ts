import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { email, password, nombre } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, nombre });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};
