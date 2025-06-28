import { PrismaClient } from '@prisma/client';
import { CategoriaModel } from "../models/CategoriaModel";
import { AppError } from "../../../shared/errors/AppError";
import { CategoriaRequestDTO } from '../dtos/CategoriaRequestDTO';

const prisma = new PrismaClient();

export class CategoriaRepository {

    async criar(request: CategoriaRequestDTO): Promise<CategoriaModel> {
        const categoria = CategoriaModel.dtos(request);
        if (!categoria) {
            throw new Error("Dados inválidos para criar Categoria");
        }

        const categoriaExistente = await prisma.categoria.findFirst({
            where: {
                nome: categoria.nome
            },
        });

        if (categoriaExistente) {
            throw new AppError("Categoria com este nome já existe.", 409);
        }

        const novaCategoria = await prisma.categoria.create({
            data: categoria.dataParaPrisma(),
        });

        return CategoriaModel.prismaParaModel(novaCategoria);
    }

    async listar(): Promise<CategoriaModel[]> {
        const categorias = await prisma.categoria.findMany();
        return categorias.map(categoria => CategoriaModel.prismaParaModel(categoria));
    }

    async buscarPorId(id: string): Promise<CategoriaModel | null> {
        if (!id) {
            throw new Error("ID é obrigatório");
        }
        const categoriaExistente = await prisma.categoria.findUnique({
            where: { id },
        });
        if (!categoriaExistente) {
            throw new AppError("Categoria não encontrada", 404);
        }

        return CategoriaModel.prismaParaModel(categoriaExistente);
    }

    async buscarPorNome(nome: string): Promise<CategoriaModel | null> {
        if (!nome) {
            throw new Error("Nome é obrigatório");
        }
        const categoriaExistente = await prisma.categoria.findFirst({
            where: { nome },
        });
        if (!categoriaExistente) {
            throw new AppError("Categoria não encontrada", 404);
        }

        return CategoriaModel.prismaParaModel(categoriaExistente);
    }

    async atualizar(id: string, data: CategoriaRequestDTO): Promise<CategoriaModel> {
        if (!id || !data) {
            throw new AppError("ID e dados são obrigatórios", 400);
        }

        const categoriaExistente = await prisma.categoria.findUnique({
            where: { id },
        });

        if (!categoriaExistente) {
            throw new AppError("Categoria não encontrada", 404);
        }

        const categoriaAtualizada = await prisma.categoria.update({
            where: { id },
            data: CategoriaModel.dtos(data).dataParaPrisma(),
        });

        return CategoriaModel.prismaParaModel(categoriaAtualizada);
    }

    async deletar(id: string): Promise<CategoriaModel> {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const categoriaExistente = await prisma.categoria.findUnique({
            where: { id },
        });

        if (!categoriaExistente) {
            throw new AppError("Categoria não encontrada", 404);
        }

        const categoriaDeletada = await prisma.categoria.delete({
            where: { id },
        });

        return CategoriaModel.prismaParaModel(categoriaDeletada);
    }
}