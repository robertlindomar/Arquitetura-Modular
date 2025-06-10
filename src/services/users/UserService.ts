import prismaClient from "../../prisma";
import { User } from "../../model/User";

class UserService {

    async criar(usuario: User) {
        if (!usuario.name || !usuario.email) {
            throw new Error("Informações faltando");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: usuario.email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("Usuário com esse email já existe");
        }

        const user = await prismaClient.user.create({
            data: {
                name: usuario.name,
                email: usuario.email,
            },
        });

        return user;
    }

    async listarTodos() {
        const users = await prismaClient.user.findMany();
        return users;
    }

    async buscarPorId(id: string) {
        if (!id) {
            throw new Error("ID do usuário é necessário");
        }

        const user = await prismaClient.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }



    async deletar(id: string) {
        if (!id) {
            throw new Error("ID do usuário é necessário");
        }

        const user = await prismaClient.user.delete({
            where: { id },
        });

        return user;
    }

    async alterar(id: string, data: Partial<User>) {
        if (!id) {
            throw new Error("ID do usuário é necessário");
        }

        const user = await prismaClient.user.update({
            where: { id },
            data,
        });

        return user;
    }
}



export { UserService };
