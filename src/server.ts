// src/server.ts
import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes());

// Middleware de tratamento de erros (sempre no final)
app.use(errorHandler);
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
