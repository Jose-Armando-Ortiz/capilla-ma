import { Router, Request, Response } from 'express';

import { pool } from '../database/db'; 

const eventosRouter = Router(); 
eventosRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM eventos ORDER BY fecha ASC');
        const eventos = result.rows;
        res.status(200).json(eventos);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener eventos' });
    }
});




export default eventosRouter; 