import { CategoriaService } from "../services/CategoriaService";
import { Request, Response, NextFunction } from "express";

export class CategoriaController {
    private service: CategoriaService;
    constructor() {
        this.service = new CategoriaService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const categoria = await this.service.criar(req.body);
            return res.status(201).json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const categorias = await this.service.listar();
            if (!categorias || categorias.length === 0) {
                return res.status(200).json({ mensagem: "Nenhuma categoria cadastrada" });
            }
            return res.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "ID é obrigatório" });
            const categoria = await this.service.buscarPorId(id);
            if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
            return res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorNome(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { nome } = req.params;
            if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });
            const categoria = await this.service.buscarPorNome(String(nome));
            if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
            return res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "ID é obrigatório" });
            const categoriaAtualizada = await this.service.atualizar(id, req.body);
            return res.status(200).json(categoriaAtualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "ID é obrigatório" });
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Categoria deletada com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}