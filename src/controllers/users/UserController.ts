import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../../services/users/UserService";

class UserController {


    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email } = request.body as { name: string; email: string };

        const service = new UserService();

        try {
            const user = await service.criar({ name, email });
            reply.status(201).send(user);
        } catch (error) {
            reply.status(400).send({ error: error instanceof Error ? error.message : "Erro ao criar usuário" });
        }
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const service = new UserService();

        try {
            const users = await service.listarTodos();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(400).send({ error: error instanceof Error ? error.message : "Erro ao listar usuários" });
        }
    }

    async getById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const service = new UserService();

        try {
            const user = await service.buscarPorId(id);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(400).send({ error: error instanceof Error ? error.message : "Erro ao buscar usuário" });
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const service = new UserService();

        try {
            const user = await service.deletar(id);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(400).send({ error: error instanceof Error ? error.message : "Erro ao deletar usuário" });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const data = request.body as Partial<{ name: string; email: string }>;

        const service = new UserService();

        try {
            const user = await service.alterar(id, data);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(400).send({ error: error instanceof Error ? error.message : "Erro ao atualizar usuário" });
        }
    }
}

export { UserController };
