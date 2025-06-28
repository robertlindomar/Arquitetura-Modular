import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { CategoriaRequestDTO } from "../dtos/CategoriaRequestDTO";
import { CategoriaResponseDTO } from "../dtos/CategoriaResponseDTO";
import { AppError } from "../../../shared/errors/AppError";

export class CategoriaService {

    private categoriaRepository: CategoriaRepository;

    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    async criar(request: CategoriaRequestDTO): Promise<CategoriaResponseDTO> {
        if (!request.nome || typeof request.nome !== 'string' || request.nome.trim() === '') {
            throw new AppError("Nome é obrigatório e deve ser válido", 400);
        }
        const categoria = await this.categoriaRepository.criar(request);
        return categoria.toResponse();
    }

    async listar(): Promise<CategoriaResponseDTO[]> {
        const categorias = await this.categoriaRepository.listar();
        return categorias.map(categoria => categoria.toResponse());
    }

    async buscarPorId(id: string): Promise<CategoriaResponseDTO | null> {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const categoria = await this.categoriaRepository.buscarPorId(id);
        return categoria ? categoria.toResponse() : null;
    }

    async buscarPorNome(nome: string): Promise<CategoriaResponseDTO | null> {
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            throw new AppError("Nome é obrigatório", 400);
        }
        const categoria = await this.categoriaRepository.buscarPorNome(nome);
        return categoria ? categoria.toResponse() : null;
    }

    async atualizar(id: string, data: CategoriaRequestDTO): Promise<CategoriaResponseDTO> {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new AppError("ID válido é obrigatório", 400);
        }
        if (!data || !data.nome || typeof data.nome !== 'string' || data.nome.trim() === '') {
            throw new AppError("Nome é obrigatório e deve ser válido", 400);
        }
        const categoria = await this.categoriaRepository.atualizar(id, data);
        return categoria.toResponse();
    }

    async deletar(id: string): Promise<CategoriaResponseDTO> {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const categoria = await this.categoriaRepository.deletar(id);
        return categoria.toResponse();
    }
}