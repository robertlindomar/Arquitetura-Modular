// src/routes.ts
import { Router } from "express";
import { categoriaRoutes } from "./modules/categoria/routes";

export function routes() {
    const router = Router();

    // Rotas do módulo categoria
    router.use("/categoria", categoriaRoutes());

    return router;
}
