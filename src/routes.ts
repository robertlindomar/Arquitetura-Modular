import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { UserController } from './controllers/users/UserController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {


    const userController = new UserController();
    fastify.post("/user", userController.create.bind(userController));
    fastify.get("/user", userController.list.bind(userController));
    fastify.get("/user/:id", userController.getById.bind(userController));
    fastify.put("/user/:id", userController.update.bind(userController));
    fastify.delete("/user/:id", userController.delete.bind(userController));




}
