import { Request, Response, NextFunction, RequestHandler } from "express"; // Asegúrate de que RequestHandler esté importado

// Middleware para verificar si el usuario está autenticado
export const requireAuth: RequestHandler = (req, res, next) => { // ¡Añadido ': RequestHandler' aquí!
    if (req.session && req.session.userId) {
        return next();
    } else {
         res.status(401).json({
            error: 'No autorizado, debes iniciar sesión con una cuenta válida'
        });
    }
};

// Middleware para verificar si el usuario es un "invitado" (no autenticado)
export const requireGuest: RequestHandler = (req, res, next): void => {
    if (req.session && req.session.userId) {
        res.status(400).json({
            error: 'Ya tienes una sesión activa'
        });
    } else {
        next();
    }
};

// También puedes eliminar esta línea, ya que no se utiliza:
// import { error } from "console";