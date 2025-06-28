import { Router, Request, Response, NextFunction } from "express";
import { CategoriaController } from "./controllers/CategoriaController";

export function categoriaRoutes() {
    const router = Router();
    const categoriaController = new CategoriaController();

    router.get("/", (req: Request, res: Response, next: NextFunction) => categoriaController.listar(req, res, next));
    router.get("/:id", (req: Request, res: Response, next: NextFunction) => categoriaController.buscarPorId(req, res, next));
    router.post("/", (req: Request, res: Response, next: NextFunction) => categoriaController.criar(req, res, next));
    router.put("/:id", (req: Request, res: Response, next: NextFunction) => categoriaController.atualizar(req, res, next));
    router.delete("/:id", (req: Request, res: Response, next: NextFunction) => categoriaController.deletar(req, res, next));
    router.get("/buscar-por-nome/:nome", (req: Request, res: Response, next: NextFunction) => categoriaController.buscarPorNome(req, res, next));

    return router;
}