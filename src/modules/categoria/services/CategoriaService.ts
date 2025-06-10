import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { Categoria } from "../models/Categoria";
import { CategoriaRequest } from "../dtos/CategoriaRequest";

class AppError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'AppError';
    }
}

export class CategoriaService {
    private repository: CategoriaRepository;

    constructor() {
        this.repository = new CategoriaRepository();
    }

    async criar(data: CategoriaRequest): Promise<Categoria> {
        if (!data.nome) {
            throw new AppError(400, "Nome é obrigatório");
        }
        return this.repository.criar(data);
    }

    async listar(): Promise<Categoria[]> {
        return this.repository.listar();
    }

    async buscarPorId(id: string): Promise<Categoria | null> {
        if (!id) {
            throw new AppError(400, "ID é obrigatório");
        }
        return this.repository.buscarPorId(id);
    }

    async atualizar(id: string, data: CategoriaRequest): Promise<Categoria> {
        if (!id) {
            throw new AppError(400, "ID é obrigatório");
        }
        if (!data.nome) {
            throw new AppError(400, "Nome é obrigatório");
        }
        const categoria = await this.repository.buscarPorId(id);
        if (!categoria) {
            throw new AppError(404, "Categoria não encontrada");
        }
        return this.repository.atualizar(id, data);
    }

    async deletar(id: string): Promise<Categoria> {
        if (!id) {
            throw new AppError(400, "ID é obrigatório");
        }
        const categoria = await this.repository.buscarPorId(id);
        if (!categoria) {
            throw new AppError(404, "Categoria não encontrada");
        }
        return this.repository.deletar(id);
    }
} 