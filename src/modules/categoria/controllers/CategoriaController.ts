import { Request, Response } from "express";
import { CategoriaService } from "../services/CategoriaService";
import { CategoriaRequest } from "../dtos/CategoriaRequest";

class AppError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'AppError';
    }
}

export class CategoriaController {
    private service: CategoriaService;

    constructor() {
        this.service = new CategoriaService();
    }

    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const data: CategoriaRequest = req.body;
            const categoria = await this.service.criar(data);
            return res.status(201).json(categoria);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async listar(req: Request, res: Response): Promise<Response> {
        try {
            const categorias = await this.service.listar();
            return res.json(categorias);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const categoria = await this.service.buscarPorId(id);
            if (!categoria) {
                throw new AppError(404, "Categoria não encontrada");
            }
            return res.json(categoria);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: CategoriaRequest = req.body;
            const categoria = await this.service.atualizar(id, data);
            return res.json(categoria);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async deletar(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.service.deletar(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
} 