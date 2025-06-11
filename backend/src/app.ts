import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import misasRoutes from "./routes/misasRoutes";
import eventosRoutes from "./routes/eventosRoutes";
import { sessionMiddleware } from "./config/session";
const app = express();

// Middleware general
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesiones
app.use(sessionMiddleware);

// Rutas
app.use('/auth', authRoutes);
app.use('/api/misas', misasRoutes);
app.use('/api/eventos', eventosRoutes);

app.get("/", (req, res) => {
  res.send("Hola soy express con TypeScript");
});

export default app;
