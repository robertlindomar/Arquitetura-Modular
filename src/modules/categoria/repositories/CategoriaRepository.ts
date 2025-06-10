import { PrismaClient, Categoria as PrismaCategoria } from "@prisma/client";
import { Categoria } from "../models/Categoria";
import { CategoriaRequest } from "../dtos/CategoriaRequest";

export class CategoriaRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async criar(data: CategoriaRequest): Promise<Categoria> {
        const categoria = await this.prisma.categoria.create({
            data: {
                nome: data.nome
            }
        });
        return this.mapToModel(categoria);
    }

    async listar(): Promise<Categoria[]> {
        const categorias = await this.prisma.categoria.findMany();
        return categorias.map(this.mapToModel);
    }

    async buscarPorId(id: string): Promise<Categoria | null> {
        const categoria = await this.prisma.categoria.findUnique({
            where: { id }
        });
        return categoria ? this.mapToModel(categoria) : null;
    }

    async atualizar(id: string, data: CategoriaRequest): Promise<Categoria> {
        const categoria = await this.prisma.categoria.update({
            where: { id },
            data: {
                nome: data.nome
            }
        });
        return this.mapToModel(categoria);
    }

    async deletar(id: string): Promise<Categoria> {
        const categoria = await this.prisma.categoria.delete({
            where: { id }
        });
        return this.mapToModel(categoria);
    }

    private mapToModel(prismaCategoria: PrismaCategoria): Categoria {
        return {
            id: prismaCategoria.id,
            nome: prismaCategoria.nome

        };
    }
} 