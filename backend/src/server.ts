
import http from "http";
import app from "./app";
import { pgPool } from "./config/db";

const port = process.env.PORT || 8080;
const server = http.createServer(app);

// Limpieza de sesiones expiradas cada hora
setInterval(async () => {
  try {
    const result = await pgPool.query('DELETE FROM session WHERE expire < NOW()');
    console.log(`${result.rowCount} sesiones expiradas eliminadas`);
  } catch (error) {
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
