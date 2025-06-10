// src/server.ts
import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes());

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
