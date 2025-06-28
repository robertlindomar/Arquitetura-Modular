import { CategoriaRequestDTO } from "../dtos/CategoriaRequestDTO";
import { CategoriaResponseDTO } from "../dtos/CategoriaResponseDTO";

export class CategoriaModel {
    id: string;
    nome: string;

    constructor(id: string, nome: string) {
        this.id = id;
        this.nome = nome;
    }

    static vazio(): CategoriaModel {
        return new CategoriaModel('', '');
    }

    static dtos(dto: CategoriaRequestDTO): CategoriaModel {
        return new CategoriaModel('', dto.nome);
    }

    static prismaParaModel(data: any): CategoriaModel {
        return new CategoriaModel(data.id, data.nome);
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
        };
    }

    toResponse(): CategoriaResponseDTO {
        return {
            id: this.id,
            nome: this.nome,
        };
    }
}