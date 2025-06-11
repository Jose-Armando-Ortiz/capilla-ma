import { Router, Request, Response } from 'express';

import { pool } from '../database/db'; 

const misasRouter = Router(); 
misasRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT id, fecha, descripcion FROM misas ORDER BY fecha ASC');
        const misas = result.rows;
        res.status(200).json(misas);
    } catch (error) {
        console.error('Error al obtener misas:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener misas' });
    }
});




export default misasRouter; // Exporta este router por defecto