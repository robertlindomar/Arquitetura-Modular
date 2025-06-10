import { getRepository } from 'typeorm';
import { Categoria } from '../../model/Categoria';

class CategoriaService {
    async listarCategorias() {
        const categoriaRepository = getRepository(Categoria);
        const categorias = await categoriaRepository.find();
        return categorias;
    }

    async criarCategoria(nome: string) {
        const categoriaRepository = getRepository(Categoria);
        const novaCategoria = categoriaRepository.create({ nome });
        await categoriaRepository.save(novaCategoria);
        return novaCategoria;
    }

    async atualizarCategoria(id: number, nome: string) {
        const categoriaRepository = getRepository(Categoria);
        const categoria = await categoriaRepository.findOne(id);

        if (!categoria) {
            throw new Error('Categoria não encontrada');
        }

        categoria.nome = nome;
        await categoriaRepository.save(categoria);
        return categoria;
    }

    async deletarCategoria(id: number) {
        const categoriaRepository = getRepository(Categoria);
        const categoria = await categoriaRepository.findOne(id);

        if (!categoria) {
            throw new Error('Categoria não encontrada');
        }

        await categoriaRepository.remove(categoria);
        return { message: 'Categoria deletada com sucesso' };
    }
}

export default new CategoriaService();