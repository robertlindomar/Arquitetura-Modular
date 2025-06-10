import { Router, Request, Response } from "express";
import { CategoriaController } from "./controllers/CategoriaController";

export function categoriaRoutes() {
    const router = Router();
    const categoriaController = new CategoriaController();

    router.post("/", async (req: Request, res: Response) => {
        try {
            await categoriaController.criar(req, res);
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    });

    router.get("/", async (req: Request, res: Response) => {
        try {
            await categoriaController.listar(req, res);
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    });

    router.get("/:id", async (req: Request, res: Response) => {
        try {
            await categoriaController.buscarPorId(req, res);
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    });

    router.put("/:id", async (req: Request, res: Response) => {
        try {
            await categoriaController.atualizar(req, res);
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    });

    router.delete("/:id", async (req: Request, res: Response) => {
        try {
            await categoriaController.deletar(req, res);
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    });

    return router;
} 