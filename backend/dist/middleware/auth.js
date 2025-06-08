"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireGuest = exports.requireAuth = void 0;
// Middleware para verificar si el usuario está autenticado
const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    else {
        res.status(401).json({
            error: 'No autorizado, debes iniciar sesión con una cuenta válida'
        });
    }
};
exports.requireAuth = requireAuth;
// Middleware para verificar si el usuario es un "invitado" (no autenticado)
const requireGuest = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.status(400).json({
            error: 'Ya tienes una sesión activa'
        });
    }
    else {
        next();
    }
};
exports.requireGuest = requireGuest;
// También puedes eliminar esta línea, ya que no se utiliza:
// import { error } from "console";
